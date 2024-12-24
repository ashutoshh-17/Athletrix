package com.whoknow.SportEvent.controller;

import com.whoknow.SportEvent.model.DTOs.RegistrationRequestDTO;
import com.whoknow.SportEvent.model.Event;
import com.whoknow.SportEvent.model.EventResult;
import com.whoknow.SportEvent.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('admin')") // Restrict access to users with the "admin" role

public class AdminController {
    @Autowired
    private EventService eventService;

    // Retrieve all events
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }



    @PutMapping("/registration/{eventId}/approve/{athleteId}")
    public ResponseEntity<String> approveRegistration(@PathVariable String eventId, @PathVariable String athleteId) {
        try {
            eventService.approveRegistration(eventId, athleteId);
            return ResponseEntity.ok("Registration approved.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/registration/{eventId}/reject/{athleteId}")
    public ResponseEntity<String> rejectRegistration(@PathVariable String eventId, @PathVariable String athleteId) {
        try {
            eventService.rejectRegistration(eventId, athleteId);
            return ResponseEntity.ok("Registration rejected.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/registrations/{eventId}")
    public ResponseEntity<Map<String, Object>> getEventRegistrations(@PathVariable String eventId) {
        List<RegistrationRequestDTO> registrations = eventService.getEventRegistrationsForAdmin(eventId);

        // Wrap the response in a map for additional metadata
        Map<String, Object> response = new HashMap<>();
        response.put("eventId", eventId);
        response.put("registrations", registrations);
        response.put("totalRegistrations", registrations.size());

        return ResponseEntity.ok(response);
    }


//Result COntroller

    @PostMapping("/results")
    public ResponseEntity<EventResult> addResult(@RequestBody EventResult eventResult) {
        EventResult savedResult = eventService.saveResult(eventResult);
        return ResponseEntity.ok(savedResult);
    }

    @PutMapping("/results/publish/{id}")
    public ResponseEntity<EventResult> publishResult(@PathVariable String id) {
        EventResult publishedResult = eventService.publishResult(id);
        return ResponseEntity.ok(publishedResult);
    }

    @GetMapping("/results/event/{eventId}")
    public ResponseEntity<List<EventResult>> getResultsByEvent(@PathVariable String eventId) {
        List<EventResult> results = eventService.getResultsByEvent(eventId);
        return ResponseEntity.ok(results);
    }
}
