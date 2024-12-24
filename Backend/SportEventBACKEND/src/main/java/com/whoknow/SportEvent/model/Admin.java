package com.whoknow.SportEvent.model;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@Document(collection = "admins")
public class Admin extends User {

    private String adminInfo;

    // Getters, setters, and other methods
}