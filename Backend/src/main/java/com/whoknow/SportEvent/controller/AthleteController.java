package com.whoknow.SportEvent.controller;

import com.whoknow.SportEvent.model.Athlete;
import com.whoknow.SportEvent.model.DTOs.EventResponseDTO;
import com.whoknow.SportEvent.model.DTOs.RegistrationRequestDTO;
import com.whoknow.SportEvent.model.Event;
import com.whoknow.SportEvent.model.EventResult;
import com.whoknow.SportEvent.repository.AthleteRepository;
import com.whoknow.SportEvent.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/athlete")
@PreAuthorize("hasAuthority('athlete')") // Restrict access to users with the "admin" role
public class AthleteController {

    @Autowired
    private EventService eventService;

    @Autowired
    private AthleteRepository athleteRepository;


    @GetMapping
    public ResponseEntity<List<EventResponseDTO>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        List<EventResponseDTO> eventResponseDTOs = events.stream()
                .map(event -> new EventResponseDTO(
                        event.getEventId(),
                        event.getEventTitle(),
                        event.getMeetName(),
                        event.getCategory(),
                        event.getEventDate(),
                        event.getLocation(),
                        event.getStatus(),
                        event.getPhotoUrl()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(eventResponseDTOs);
    }


    @PostMapping("/register/{eventId}")
    public ResponseEntity<String> registerForEvent(@PathVariable String eventId, @AuthenticationPrincipal UserDetails userDetails) {
        String athleteUsername = userDetails.getUsername();
        Athlete athlete = athleteRepository.findByUsername(athleteUsername)
                .orElseThrow(() -> new RuntimeException("Athlete not found"));
        eventService.registerAthleteForEvent(eventId, athleteUsername);
        return ResponseEntity.ok("Registration successful!");
    }

    // athlete

    // Athlete's approved events
    // Retrieve all registrations for the logged-in athlete
    @GetMapping("/myRegistrations")
    public ResponseEntity<List<RegistrationRequestDTO>> getAthleteRegistrations(@AuthenticationPrincipal UserDetails userDetails) {
        // Get the athlete based on the logged-in username
        Athlete athlete = athleteRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Athlete not found"));

        // Get the athlete's registrations using the service
        List<RegistrationRequestDTO> registrations = eventService.getAthleteRegistrations(athlete.getId());
        return ResponseEntity.ok(registrations);
    }
    //update
    @PutMapping("/update")
    public ResponseEntity<Athlete> updateAthleteDetails(
            @RequestBody Athlete updatedDetails,
            @AuthenticationPrincipal UserDetails userDetails) {
        // Retrieve the current logged-in athlete by username
        Athlete athlete = athleteRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Athlete not found"));

        // Update the athlete's details
        athlete.setFirstName(updatedDetails.getFirstName());
        athlete.setLastName(updatedDetails.getLastName());
        athlete.setBirthDate(updatedDetails.getBirthDate());
        athlete.setGender(updatedDetails.getGender());
        athlete.setHeight(updatedDetails.getHeight());
        athlete.setWeight(updatedDetails.getWeight());
        athlete.setCategory(updatedDetails.getCategory());
        athlete.setPhotoUrl(updatedDetails.getPhotoUrl());



        // Save updated athlete in the repository
        Athlete updatedAthlete = athleteRepository.save(athlete);

        System.out.println("Athlete details updated successfully for username: " + userDetails.getUsername());

        return ResponseEntity.ok(updatedAthlete);
    }

    @GetMapping("/profile")
    public ResponseEntity<Athlete> getAthleteProfile(@AuthenticationPrincipal UserDetails userDetails) {
        // Retrieve the current logged-in athlete by username
        Athlete athlete = athleteRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Athlete not found"));

        // Return the athlete's profile details
        return ResponseEntity.ok(athlete);
    }
    // view result
    @GetMapping("/results/event/{eventId}")
    public ResponseEntity<List<EventResult>> getResultsByEvent(@PathVariable String eventId) {
        List<EventResult> results = eventService.getResultsByEvent(eventId);
        return ResponseEntity.ok(results);
    }
}
