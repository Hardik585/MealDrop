package com.mealdrop.service;

import com.mealdrop.dto.FoodRequest;
import com.mealdrop.dto.FoodResponse;
import org.springframework.web.multipart.MultipartFile;


public interface FoodService {
    public FoodResponse addFood(FoodRequest foodRequest , MultipartFile file);
}
