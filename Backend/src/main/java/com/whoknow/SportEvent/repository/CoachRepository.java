package com.whoknow.SportEvent.repository;
import com.whoknow.SportEvent.model.Coach;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CoachRepository extends MongoRepository<Coach, String> {
    Optional<Coach> findByUsername(String username);
}