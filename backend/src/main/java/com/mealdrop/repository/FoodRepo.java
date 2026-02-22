package com.mealdrop.repository;

import com.mealdrop.entity.FoodEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepo extends JpaRepository<FoodEntity,Integer> {

}
