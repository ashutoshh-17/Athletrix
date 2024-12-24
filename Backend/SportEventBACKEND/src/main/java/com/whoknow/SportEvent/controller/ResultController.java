package com.whoknow.SportEvent.controller;

import com.whoknow.SportEvent.model.EventResult;
import com.whoknow.SportEvent.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ResultController {
    @Autowired
    private EventService eventService;

    //fOR ATHLETE , ADMIN & coach

    //view result
    @GetMapping("/results/event/{eventId}")
    public ResponseEntity<List<EventResult>> getResultsByEvent(@PathVariable String eventId) {
        List<EventResult> results = eventService.getResultsByEvent(eventId);
        return ResponseEntity.ok(results);
    }

    // View all results
    @GetMapping("/results")
    public ResponseEntity<List<EventResult>> getAllResults() {
        List<EventResult> results = eventService.getAllResults();
        return ResponseEntity.ok(results);
    }
}

