package com.whoknow.SportEvent.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
@Data
@Document(collection = "event_results")
public class EventResult {
    @Id
    private String resultId; // Unique identifier for the event result
    private String eventId;  // Event ID (automatically fetched if not provided)
    private String athleteId; // Athlete ID (automatically fetched if not provided)
    private String eventTitle; // Event Title (can be used to display the event name)
    private String athleteName; // Athlete's Name
    private String Remarks; // Actions taken for the result (e.g., updates or comments)
    private boolean isPublished; // Whether the result is published or not
    private LocalDateTime publishedDate; // Date and time when the result was published


    // Getters and setters
}
