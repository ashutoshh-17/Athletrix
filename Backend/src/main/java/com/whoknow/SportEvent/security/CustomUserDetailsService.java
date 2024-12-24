package com.whoknow.SportEvent.security;
import com.whoknow.SportEvent.model.Admin;
import com.whoknow.SportEvent.model.Athlete;
import com.whoknow.SportEvent.model.Coach;
import com.whoknow.SportEvent.repository.AdminRepository;
import com.whoknow.SportEvent.repository.AthleteRepository;
import com.whoknow.SportEvent.repository.CoachRepository;
import com.whoknow.SportEvent.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AthleteRepository athleteRepository;
    @Autowired
    private CoachRepository coachRepository;
    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Attempt to find the user in the Athlete repository
        Optional<Athlete> athleteOpt = athleteRepository.findByUsername(username);
        if (athleteOpt.isPresent()) {
            Athlete athlete = athleteOpt.get();
            Collection<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("athlete")); // Add the appropriate role
            return new org.springframework.security.core.userdetails.User(athlete.getUsername(), athlete.getPassword(), authorities);
        }

        // Attempt to find the user in the Coach repository
        Optional<Coach> coachOpt = coachRepository.findByUsername(username);
        if (coachOpt.isPresent()) {
            Coach coach = coachOpt.get();
            Collection<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("coach")); // Add the appropriate role
            return new org.springframework.security.core.userdetails.User(coach.getUsername(), coach.getPassword(), authorities);
        }

        // Attempt to find the user in the Admin repository
        Optional<Admin> adminOpt = adminRepository.findByUsername(username);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            Collection<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("admin")); // Add the appropriate role
            return new org.springframework.security.core.userdetails.User(admin.getUsername(), admin.getPassword(), authorities);
        }

        // If no user is found in any repository, throw an exception
        throw new UsernameNotFoundException("User not found");
    }



}