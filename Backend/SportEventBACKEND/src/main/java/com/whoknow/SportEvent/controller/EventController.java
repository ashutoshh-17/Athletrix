package com.whoknow.SportEvent.controller;
import com.whoknow.SportEvent.model.Event;
import com.whoknow.SportEvent.repository.AthleteRepository;
import com.whoknow.SportEvent.service.EventService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
@Slf4j

@PreAuthorize("hasAuthority('admin')") // Restrict access to users with the "admin" role
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private AthleteRepository athleteRepository;

    // Retrieve all events
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    // Create a new event
    @PostMapping(value = "/create", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Map<String, Object>> createEvent(@RequestBody Event event) {
        Map<String, Object> response = new HashMap<>();
        try {
            log.info("Create Event initiated");
            Event createdEvent = eventService.createEvent(event);
            log.info("Create Event Success");

            response.put("message", "Event created successfully!");
            response.put("event", createdEvent); // Adding event details to the response
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            response.put("message", "Error creating event: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }


}


    // Update an existing event
    @PutMapping("/update/{eventId}")
    public ResponseEntity<?> updateEvent(@PathVariable String eventId, @RequestBody Event event) {
        try {
            Event updatedEvent = eventService.updateEvent(eventId, event);
            return ResponseEntity.ok(updatedEvent);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error updating event: " + e.getMessage());
        }
    }

    // Delete an event by ID
    @DeleteMapping("/delete/{eventId}")
    public ResponseEntity<?> deleteEvent(@PathVariable String eventId) {
        try {
            eventService.deleteEvent(eventId);
            return ResponseEntity
                    .noContent()
                    .build(); // Returns 204 No Content
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error deleting event: " + e.getMessage());
        }
    }
}
