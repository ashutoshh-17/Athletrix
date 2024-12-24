package com.whoknow.SportEvent.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.whoknow.SportEvent.config.JwtUtil;
import com.whoknow.SportEvent.model.*;
import com.whoknow.SportEvent.model.DTOs.AdminUpdateDTO;
import com.whoknow.SportEvent.model.DTOs.AthleteUpdateDTO;
import com.whoknow.SportEvent.model.DTOs.CoachUpdateDTO;
import com.whoknow.SportEvent.repository.AdminRepository;
import com.whoknow.SportEvent.repository.AthleteRepository;
import com.whoknow.SportEvent.repository.CoachRepository;
import com.whoknow.SportEvent.security.CustomUserDetailsService;
import com.whoknow.SportEvent.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private CoachRepository coachRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("User registered successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            // Load the user details using the username
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getUsername());

            // Check if the provided password matches the stored password
            if (passwordEncoder.matches(user.getPassword(), userDetails.getPassword())) {

                // Extract the role from the user's authorities (granted authorities)
                String role = userDetails.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .findFirst()
                        .orElse("ROLE_USER");  // Default role if no specific role found

                // Generate the JWT token with username and role
                String token = jwtUtil.generateToken(userDetails.getUsername(), role);

                // Return the token and role as a response
                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                response.put("role", role);

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(401).body(Collections.singletonMap("error", "Invalid login credentials"));
            }
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(401).body(Collections.singletonMap("error", "Invalid login credentials"));
        }
    }







    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(@RequestBody Object updatedUser) {
        User authenticatedUser = userService.getAuthenticatedUser();
        if (authenticatedUser != null) {
            try {
                Object convertedUser = convertToUserDTO(authenticatedUser.getRole(), updatedUser);
                updateUser(authenticatedUser, convertedUser);
                return ResponseEntity.ok("Profile updated successfully");
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        } else {
            return ResponseEntity.status(401).body("User not authenticated");
        }
    }

    private Object convertToUserDTO(String role, Object updatedUser) {
        if (role.equals("athlete")) {
            return new ObjectMapper().convertValue(updatedUser, AthleteUpdateDTO.class);
        } else if (role.equals("coach")) {
            return new ObjectMapper().convertValue(updatedUser, CoachUpdateDTO.class);
        } else if (role.equals("admin")) {
            return new ObjectMapper().convertValue(updatedUser, AdminUpdateDTO.class);
        } else {
            throw new IllegalArgumentException("Invalid role");
        }
    }

    private void updateUser(User authenticatedUser, Object updatedUser) {
        switch (authenticatedUser.getRole()) {
            case "athlete":
                Athlete athlete = athleteRepository.findById(authenticatedUser.getId())
                        .orElseThrow(() -> new IllegalArgumentException("Athlete not found"));
                updateAthleteDetails(athlete, (AthleteUpdateDTO) updatedUser);
                athleteRepository.save(athlete);
                break;

            case "coach":
                Coach coach = coachRepository.findById(authenticatedUser.getId())
                        .orElseThrow(() -> new IllegalArgumentException("Coach not found"));
                updateCoachDetails(coach, (CoachUpdateDTO) updatedUser);
                coachRepository.save(coach);
                break;

            case "admin":
                Admin admin = adminRepository.findById(authenticatedUser.getId())
                        .orElseThrow(() -> new IllegalArgumentException("Admin not found"));
                updateAdminDetails(admin, (AdminUpdateDTO) updatedUser);
                adminRepository.save(admin);
                break;

            default:
                throw new IllegalArgumentException("Invalid role");
        }
    }

// Update methods remain unchanged...

    private void updateAthleteDetails(Athlete athlete, AthleteUpdateDTO updatedUser) {
        athlete.setUsername(updatedUser.getUsername());
        if (updatedUser.getPassword() != null) {
            athlete.setPassword(passwordEncoder.encode(updatedUser.getPassword())); // Encode if provided
        }
        athlete.setFirstName(updatedUser.getFirstName());
        athlete.setLastName(updatedUser.getLastName());
        athlete.setBirthDate(updatedUser.getBirthDate());
        athlete.setGender(updatedUser.getGender());
        athlete.setHeight(updatedUser.getHeight());
        athlete.setWeight(updatedUser.getWeight());
        athlete.setCategory(updatedUser.getCategory());
        athlete.setPhotoUrl(updatedUser.getPhotoUrl());
    }

    private void updateCoachDetails(Coach coach, CoachUpdateDTO updatedUser) {
        coach.setUsername(updatedUser.getUsername());
        if (updatedUser.getPassword() != null) {
            coach.setPassword(passwordEncoder.encode(updatedUser.getPassword())); // Encode if provided
        }
        coach.setFirstName(updatedUser.getFirstName());
        coach.setLastName(updatedUser.getLastName());
        coach.setBirthDate(updatedUser.getBirthDate());
        coach.setGender(updatedUser.getGender());
        coach.setSpeciality(updatedUser.getSpeciality());
        coach.setCategory(updatedUser.getCategory());
        coach.setPhotoUrl(updatedUser.getPhotoUrl());
    }

    private void updateAdminDetails(Admin admin, AdminUpdateDTO updatedUser) {
        admin.setUsername(updatedUser.getUsername());
        if (updatedUser.getPassword() != null) {
            admin.setPassword(passwordEncoder.encode(updatedUser.getPassword())); // Encode if provided
        }
        // Add any specific admin fields here if necessary,
        // For example, you can add admin-specific updates if required
        // admin.setSomeField(updatedUser.getSomeField());
    }

}
