package com.whoknow.SportEvent.model.DTOs;

import lombok.Data;

import java.util.Date;

@Data
public class CoachUpdateDTO {
    private String username;
    private String password; // Optional
    private String firstName;
    private String lastName;
    private Date birthDate;
    private String gender;
    private String speciality;
    private String category;
    private String photoUrl;
}
