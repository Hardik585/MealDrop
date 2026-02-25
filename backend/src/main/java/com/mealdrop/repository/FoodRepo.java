package com.mealdrop.repository;

import com.mealdrop.entity.FoodEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FoodRepo extends MongoRepository<FoodEntity, String> {

}
