package com.mealdrop.service;

import com.mealdrop.dto.FoodRequestDTO;
import com.mealdrop.dto.FoodResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface FoodService {
   FoodResponseDTO addFood(FoodRequestDTO foodRequestDTO, MultipartFile file);

   List<FoodResponseDTO> getFoods();

   FoodResponseDTO getFood(String id);

   void deleteFood(String id);

}
