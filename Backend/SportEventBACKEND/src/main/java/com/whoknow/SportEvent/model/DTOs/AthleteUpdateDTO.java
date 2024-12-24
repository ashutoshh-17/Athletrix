package com.whoknow.SportEvent.model.DTOs;

import lombok.Data;
import java.util.Date;


@Data
public class AthleteUpdateDTO {
    private String username;
    private String password;   // Optional, if the user wants to change it
    private String firstName;
    private String lastName;
    private Date birthDate;
    private String gender;
    private float height;
    private float weight;
    private String category;
    private String photoUrl;
}

