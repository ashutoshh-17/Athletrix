package com.whoknow.SportEvent.repository;

import com.whoknow.SportEvent.model.EventResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EventResultRepository extends MongoRepository<EventResult, String> {
    List<EventResult> findByEventId(String eventId);
}
