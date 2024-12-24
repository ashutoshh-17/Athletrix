package com.whoknow.SportEvent.model.DTOs;

import lombok.Data;

import java.util.Date;

@Data

public class EventResponseDTO {

    private String eventId;
    private String eventTitle;
    private String meetName;
    private String category;
    private Date eventDate;
    private String location;
    private String status;
    private String photoUrl;

    // Constructor
    public EventResponseDTO(String eventId, String eventTitle, String meetName,
                            String category, Date eventDate, String location, String status, String photoUrl) {
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.meetName = meetName;
        this.category = category;
        this.eventDate = eventDate;
        this.location = location;
        this.status = status;
        this.photoUrl = photoUrl;
    }

    // Getters and Setters
    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

    public String getMeetName() {
        return meetName;
    }

    public void setMeetName(String meetName) {
        this.meetName = meetName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Date getEventDate() {
        return eventDate;
    }

    public void setEventDate(Date eventDate) {
        this.eventDate = eventDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPhotoUrl() { return photoUrl; }

    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
    }


