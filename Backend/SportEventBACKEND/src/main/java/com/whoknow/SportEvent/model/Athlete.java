package com.whoknow.SportEvent.model;

import com.whoknow.SportEvent.model.DTOs.RegistrationRequestDTO;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "athletes")
public class Athlete extends User {

    private String firstName;
    private String lastName;
    private Date birthDate;
    private String gender;
    private float height;
    private float weight;
    private String category;
    private String photoUrl;
    private List<RegistrationRequestDTO> registrationRequests = new ArrayList<>();

}
