package com.whoknow.SportEvent.repository;
import com.whoknow.SportEvent.model.Athlete;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AthleteRepository extends MongoRepository<Athlete, String> {
    Optional<Athlete> findByUsername(String username);
}