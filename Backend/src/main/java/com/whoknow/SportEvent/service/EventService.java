package com.whoknow.SportEvent.service;

import com.whoknow.SportEvent.model.Athlete;
import com.whoknow.SportEvent.model.Coach;
import com.whoknow.SportEvent.model.DTOs.RegistrationRequestDTO;
import com.whoknow.SportEvent.model.Event;
import com.whoknow.SportEvent.model.EventResult;
import com.whoknow.SportEvent.repository.AthleteRepository;
import com.whoknow.SportEvent.repository.CoachRepository;
import com.whoknow.SportEvent.repository.EventRepository;
import com.whoknow.SportEvent.repository.EventResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private AthleteRepository athleteRepository;

    // Retrieve all events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // Create a new event
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(String eventId, Event event) {
        Optional<Event> existingEventOpt = eventRepository.findById(eventId);

        if (existingEventOpt.isPresent()) {
            Event existingEvent = existingEventOpt.get();

            // Update fields from the provided event to the existing event
            existingEvent.setEventTitle(event.getEventTitle());
            existingEvent.setMeetName(event.getMeetName());
            existingEvent.setCategory(event.getCategory());
            existingEvent.setEventDate(event.getEventDate());
            existingEvent.setLocation(event.getLocation());
            existingEvent.setPhotoUrl(event.getPhotoUrl());


            // Save and return the updated event
            return eventRepository.save(existingEvent);
        } else {
            throw new RuntimeException("Event not found");
        }
    }

    // Delete an event
    public void deleteEvent(String eventId) {
        eventRepository.deleteById(eventId);
    }

    // Register athlete for an event
    public void registerAthleteForEvent(String eventId, String athleteUsername) {
        Athlete athlete = athleteRepository.findByUsername(athleteUsername)
                .orElseThrow(() -> new RuntimeException("Athlete not found"));
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        // Check if the athlete is already registered
        boolean isAlreadyRegistered = athlete.getRegistrationRequests().stream()
                .anyMatch(request -> request.getEventId().equals(eventId));
        if (isAlreadyRegistered) {
            throw new RuntimeException("Already registered for this event");
        }

        // Create and add new registration request
        RegistrationRequestDTO newRequest = new RegistrationRequestDTO(
                eventId,
                event.getEventTitle(),
                athlete.getId(),
                athleteUsername
        );
        athlete.getRegistrationRequests().add(newRequest);
        athleteRepository.save(athlete);

        // Add athlete to event's pending registrations
        event.getRegistrationRequests().add(newRequest);
        eventRepository.save(event);
    }

    // Approve registration for an athlete
    public void approveRegistration(String eventId, String athleteId) {
        Athlete athlete = athleteRepository.findById(athleteId)
                .orElseThrow(() -> new RuntimeException("Athlete not found"));
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        for (RegistrationRequestDTO request : athlete.getRegistrationRequests()) {
            if (request.getEventId().equals(eventId)) {
                request.setStatus("approved");
                athleteRepository.save(athlete);

                // Add athlete to approved registrations in the event
                event.getApprovedRegistrations().add(request);
                eventRepository.save(event);
                return;
            }
        }
        throw new RuntimeException("Registration request not found");
    }

    // Reject registration for an athlete
    public void rejectRegistration(String eventId, String athleteId) {
        Athlete athlete = athleteRepository.findById(athleteId)
                .orElseThrow(() -> new RuntimeException("Athlete not found"));

        for (RegistrationRequestDTO request : athlete.getRegistrationRequests()) {
            if (request.getEventId().equals(eventId)) {
                request.setStatus("rejected");
                athleteRepository.save(athlete);
                return;
            }
        }
        throw new RuntimeException("Registration request not found");
    }

    public List<RegistrationRequestDTO> getAthleteRegistrations(String athleteId) {
        Athlete athlete = athleteRepository.findById(athleteId)
                .orElseThrow(() -> new RuntimeException("Athlete not found"));

        return athlete.getRegistrationRequests();
    }

    public List<RegistrationRequestDTO> getEventRegistrationsForAdmin(String eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        // Filter for only pending and approved registrations
        return event.getRegistrationRequests().stream()
                .filter(request -> "pending".equals(request.getStatus()) || "approved".equals(request.getStatus()))
                .toList();
    }

    //update atheletics
    @Service
    public class AthleteService {

        @Autowired
        private AthleteRepository athleteRepository;

        public Athlete updateAthleteDetails(String username, Athlete updatedDetails) {
            // Find the athlete by username
            Athlete athlete = athleteRepository.findByUsername(username)
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

            // Save the updated athlete
            return athleteRepository.save(athlete);
        }
    }
    // update for coach

    public class CoachService {

        @Autowired
        private CoachRepository coachRepository;

        public Coach updateCoachDetails(String username, Coach updatedDetails) {
            // Find the coach by username
            Coach coach = coachRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Coach not found"));

            // Update the coach's details
            coach.setFirstName(updatedDetails.getFirstName());
            coach.setLastName(updatedDetails.getLastName());
            coach.setBirthDate(updatedDetails.getBirthDate());
            coach.setGender(updatedDetails.getGender());
            coach.setSpeciality(updatedDetails.getSpeciality());
            coach.setCategory(updatedDetails.getCategory());
            coach.setPhotoUrl(updatedDetails.getPhotoUrl());

            // Save the updated coach
            return coachRepository.save(coach);
        }
    }

//    //Result Publish
//    @Autowired
//    private EventResultRepository eventResultRepository;
//
//    // Save a new result
//    public EventResult saveResult(EventResult eventResult) {
//        return eventResultRepository.save(eventResult);
//    }
//
//    // Retrieve results by event ID
//    public List<EventResult> getResultsByEvent(String eventId) {
//        return eventResultRepository.findByEventId(eventId);
//    }
//
//    // Publish a result
//    public EventResult publishResult(String resultId) {
//        // Fetch the result from the repository
//        EventResult result = eventResultRepository.findById(resultId)
//                .orElseThrow(() -> new RuntimeException("Result not found"));
//
//        // Update the result's publication status and publication date
//        result.setPublished(true); // Use the correct setter for the isPublished field
//        result.setPublishedDate(LocalDateTime.now());
//
//        // Save the updated result in the database
//        return eventResultRepository.save(result);
//    }

    // Save a new result
    @Autowired
    private EventResultRepository eventResultRepository;
    public EventResult saveResult(EventResult eventResult) {
        // If eventId and athleteId are not provided, they will be fetched from the eventResult or other context
        if (eventResult.getEventId() == null || eventResult.getAthleteId() == null) {
            // Fetch eventId and athleteId based on other context (e.g., eventResultId)
            EventResult fetchedResult = eventResultRepository.findById(eventResult.getResultId())
                    .orElseThrow(() -> new RuntimeException("Result not found"));
            eventResult.setEventId(fetchedResult.getEventId());
            eventResult.setAthleteId(fetchedResult.getAthleteId());
        }

        // Save the new result
        return eventResultRepository.save(eventResult);
    }

    // Retrieve results by event ID
    public List<EventResult> getResultsByEvent(String eventId) {
        return eventResultRepository.findByEventId(eventId);
    }

    // Publish a result
    public EventResult publishResult(String resultId) {
        // Fetch the result from the repository
        EventResult result = eventResultRepository.findById(resultId)
                .orElseThrow(() -> new RuntimeException("Result not found"));

        // Automatically fetch eventId and athleteId if not already set
        if (result.getEventId() == null || result.getAthleteId() == null) {
            result.setEventId(fetchEventIdFromResult(result));
            result.setAthleteId(fetchAthleteIdFromResult(result));
        }

        // Update the result's publication status and publication date
        result.setPublished(true); // Use the correct setter for the isPublished field
        result.setPublishedDate(LocalDateTime.now());

        // Save the updated result in the database
        return eventResultRepository.save(result);
    }

    // Helper method to fetch eventId based on resultId
    private String fetchEventIdFromResult(EventResult result) {
        // Logic to fetch eventId from result (e.g., look it up in the Event entity)
        return "eventIdFromResult";
    }

    // Helper method to fetch athleteId based on resultId
    private String fetchAthleteIdFromResult(EventResult result) {
        // Logic to fetch athleteId from result (e.g., look it up in the Athlete entity)
        return "athleteIdFromResult";
    }

    public List<EventResult> getAllResults() {
        return eventResultRepository.findAll(); // Assuming you're using a repository
    }
}
