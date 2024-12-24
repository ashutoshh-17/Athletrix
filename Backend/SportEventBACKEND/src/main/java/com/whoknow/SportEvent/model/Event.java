package com.whoknow.SportEvent.model;

import com.whoknow.SportEvent.model.DTOs.RegistrationRequestDTO;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Data
@Document(collection = "events")
public class Event {

    @Id
    private String eventId; // Unique identifier for the event
    private String eventTitle; // Title of the event
    private String meetName; // Name of the meet or competition
    private String category; // Category (could refer to age group, skill level, etc.)
    private Date eventDate; // Date of the event
    private String location; // Location where the event is held
    private String photoUrl; // Event page photoUrl


    // Optional fields for better management by the admin
    private String status; // e.g., "open", "closed" (for registration status)


    // List to keep track of athlete registration info for this event
    // List to track all registration requests (pending, approved, rejected)
    private List<RegistrationRequestDTO> registrationRequests = new ArrayList<>();
    // List for approved registrations
    private List<RegistrationRequestDTO> approvedRegistrations = new ArrayList<>();

    public void addRegistrationRequest(RegistrationRequestDTO request) {
        registrationRequests.add(request);
    }



    @Data
    public static class RegisteredAthleteInfo {
        private String athleteId;
        private String athleteUsername;
        private String eventId; // Unique identifier for the event
        private String eventTitle; // Title of the event

        public RegisteredAthleteInfo(String athleteId, String athleteUsername) {
            this.athleteId = athleteId;
            this.athleteUsername = athleteUsername;
        }
    }
}
