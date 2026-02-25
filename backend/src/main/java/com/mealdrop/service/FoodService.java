package com.mealdrop.service;

import com.mealdrop.dto.FoodRequest;
import com.mealdrop.dto.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface FoodService {
   FoodResponse addFood(FoodRequest foodRequest , MultipartFile file);

   List<FoodResponse> getFoods();

   FoodResponse getFood(String id);

   void deleteFood(String id);

}
