package com.whoknow.SportEvent.model;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "coaches")
public class Coach extends User {

    private String firstName;
    private String lastName;
    private Date birthDate;
    private String gender;
    private String speciality;
    private String category;
    private String photoUrl;


}
