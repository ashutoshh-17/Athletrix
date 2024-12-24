package com.whoknow.SportEvent.controller;

import com.whoknow.SportEvent.model.Coach;
import com.whoknow.SportEvent.model.Event;

import com.whoknow.SportEvent.model.EventResult;
import com.whoknow.SportEvent.repository.CoachRepository;
import com.whoknow.SportEvent.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coach")
@PreAuthorize("hasAuthority('coach')") // Restrict access to users with the "admin" role
public class CoachController {
    @Autowired
    private EventService eventService;



    // Retrieve all events
    @GetMapping("/view/events")
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }


       @Autowired
        private CoachRepository coachRepository;

        @PutMapping("/update")
        public ResponseEntity<Coach> updateCoachDetails(
                @RequestBody Coach updatedDetails,
                @AuthenticationPrincipal UserDetails userDetails) {
            // Retrieve the current logged-in coach by username
            Coach coach = coachRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("Coach not found"));

            // Update the coach's details
            coach.setFirstName(updatedDetails.getFirstName());
            coach.setLastName(updatedDetails.getLastName());
            coach.setBirthDate(updatedDetails.getBirthDate());
            coach.setGender(updatedDetails.getGender());
            coach.setSpeciality(updatedDetails.getSpeciality());
            coach.setCategory(updatedDetails.getCategory());
            coach.setPhotoUrl(updatedDetails.getPhotoUrl());

            // Save updated coach in the repository
            Coach updatedCoach = coachRepository.save(coach);

            System.out.println("Coach details updated successfully for username: " + userDetails.getUsername());

            return ResponseEntity.ok(updatedCoach);
        }

    @GetMapping("/profile")
    public ResponseEntity<Coach> getCoachProfile(@AuthenticationPrincipal UserDetails userDetails) {
        // Retrieve the current logged-in coach by username
        Coach coach = coachRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Coach not found"));

        // Return the coach's profile details
        return ResponseEntity.ok(coach);
    }

    // view result
    @GetMapping("/results/event/{eventId}")
    public ResponseEntity<List<EventResult>> getResultsByEvent(@PathVariable String eventId) {
        List<EventResult> results = eventService.getResultsByEvent(eventId);
        return ResponseEntity.ok(results);
    }

    }

