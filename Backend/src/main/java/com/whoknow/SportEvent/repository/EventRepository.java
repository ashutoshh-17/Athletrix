package com.whoknow.SportEvent.repository;

import com.whoknow.SportEvent.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    // You can define custom query methods here if needed

}