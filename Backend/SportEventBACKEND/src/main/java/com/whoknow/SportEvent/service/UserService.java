package com.whoknow.SportEvent.service;
import com.whoknow.SportEvent.model.Admin;
import com.whoknow.SportEvent.model.Athlete;
import com.whoknow.SportEvent.model.Coach;
import com.whoknow.SportEvent.model.User;
import com.whoknow.SportEvent.repository.AdminRepository;
import com.whoknow.SportEvent.repository.AthleteRepository;
import com.whoknow.SportEvent.repository.CoachRepository;
import com.whoknow.SportEvent.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private CoachRepository coachRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User authenticate(String username, String password) {
        // Check in Athlete repository
        Optional<Athlete> athlete = athleteRepository.findByUsername(username);
        if (athlete.isPresent() && passwordEncoder.matches(password, athlete.get().getPassword())) {
            return athlete.get();
        }

        // Check in Coach repository
        Optional<Coach> coach = coachRepository.findByUsername(username);
        if (coach.isPresent() && passwordEncoder.matches(password, coach.get().getPassword())) {
            return coach.get();
        }

        // Check in Admin repository
        Optional<Admin> admin = adminRepository.findByUsername(username);
        if (admin.isPresent() && passwordEncoder.matches(password, admin.get().getPassword())) {
            return admin.get();
        }

        // If not found in any repository
        return null;
    }


    public User getAuthenticatedUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        // Check in Athlete repository
        Optional<Athlete> athleteOpt = athleteRepository.findByUsername(username);
        if (athleteOpt.isPresent()) {
            return athleteOpt.get(); // Return athlete if found
        }

        // Check in Coach repository
        Optional<Coach> coachOpt = coachRepository.findByUsername(username);
        if (coachOpt.isPresent()) {
            return coachOpt.get(); // Return coach if found
        }

        // Check in Admin repository
        Optional<Admin> adminOpt = adminRepository.findByUsername(username);
        if (adminOpt.isPresent()) {
            return adminOpt.get(); // Return admin if found
        }

        // If not found in any repository, return null
        return null;
    }






    public void registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        switch (user.getRole()) {
            case "athlete":
                Athlete athlete = new Athlete();
                athlete.setUsername(user.getUsername());
                athlete.setPassword(user.getPassword());
                //athlete.setRole(user.getRole());
                athleteRepository.save(athlete);
                break;
            case "coach":
                Coach coach = new Coach();
                coach.setUsername(user.getUsername());
                coach.setPassword(user.getPassword());
                coach.setRole(user.getRole());
                coachRepository.save(coach);
                break;
            case "admin":
                Admin admin = new Admin();
                admin.setUsername(user.getUsername());
                admin.setPassword(user.getPassword());
                admin.setRole(user.getRole());
                adminRepository.save(admin);
                break;
            default:
                throw new IllegalArgumentException("Invalid role specified");
        }
    }

}
