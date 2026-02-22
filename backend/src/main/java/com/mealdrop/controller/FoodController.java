package com.mealdrop.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mealdrop.dto.FoodRequest;
import com.mealdrop.dto.FoodResponse;
import com.mealdrop.service.FoodService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;

import org.springframework.web.multipart.MultipartFile;

@Controller
@AllArgsConstructor
public class FoodController {

    private FoodService foodService;

    @PostMapping(value = "/foods", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FoodResponse> createFood(@RequestPart("image") MultipartFile file,
                                                   @RequestPart("food") String foodJson) throws JsonProcessingException {
               FoodRequest foodRequest  = new ObjectMapper().readValue(foodJson, FoodRequest.class);
       FoodResponse response =foodService.addFood(foodRequest,file);
       return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
