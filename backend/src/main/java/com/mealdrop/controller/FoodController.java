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
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@AllArgsConstructor
public class FoodController {

    private FoodService foodService;

    @PostMapping(value = "/foods", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createFood(@RequestPart("image") MultipartFile file,
                                                   @RequestPart("food") String foodJson) throws JsonProcessingException {
               FoodRequest foodRequest  = new ObjectMapper().readValue(foodJson, FoodRequest.class);
       FoodResponse response =foodService.addFood(foodRequest,file);
       return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/foods")
    public ResponseEntity<List<FoodResponse>> getFoods(){
        List<FoodResponse> list =  foodService.getFoods();
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping("/food/{id}")
    public ResponseEntity<?> getFood(@PathVariable String id){
         FoodResponse food=foodService.getFood(id);
         return ResponseEntity.status(HttpStatus.OK).body(food);
    }

    @DeleteMapping("/deletefood/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> deleteFood(@PathVariable String id){
        foodService.deleteFood(id);
        return ResponseEntity.noContent().build();
    }
}
