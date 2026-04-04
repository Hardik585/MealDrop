package com.mealdrop.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mealdrop.dto.FoodRequestDTO;
import com.mealdrop.dto.FoodResponseDTO;
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
@RequestMapping("/api")
@AllArgsConstructor
@CrossOrigin("*")
public class FoodController {

    private FoodService foodService;

    @PostMapping(value = "/foods", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createFood(@RequestPart("image") MultipartFile file,
                                                   @RequestPart("food") String foodJson) throws JsonProcessingException {
               FoodRequestDTO foodRequestDTO = new ObjectMapper().readValue(foodJson, FoodRequestDTO.class);
       FoodResponseDTO response =foodService.addFood(foodRequestDTO,file);
       return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/foods")
    public ResponseEntity<List<FoodResponseDTO>> getFoods(){
        List<FoodResponseDTO> list =  foodService.getFoods();
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping("/food/{id}")
    public ResponseEntity<?> getFood(@PathVariable String id){
         FoodResponseDTO food=foodService.getFood(id);
         return ResponseEntity.status(HttpStatus.OK).body(food);
    }

    @DeleteMapping("/deletefood/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> deleteFood(@PathVariable String id){
        foodService.deleteFood(id);
        return ResponseEntity.noContent().build();
    }
}
