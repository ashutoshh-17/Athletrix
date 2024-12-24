package com.whoknow.SportEvent.model.DTOs;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Registrations")
@Data
public class RegistrationRequestDTO {
    private String eventId; // ID of the event
    private String eventTitle; // Title of the event
    private String athleteId; // ID of the athlete
    private String athleteUsername; // Username of the athlete
    private String status; // Status of the registration (e.g., "pending", "approved", "rejected")

    // Constructor
    public RegistrationRequestDTO(String eventId, String eventTitle, String athleteId, String athleteUsername) {
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.athleteId = athleteId;
        this.athleteUsername = athleteUsername;
        this.status = "pending"; // Default status upon registration request
    }
}