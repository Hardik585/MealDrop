package com.mealdrop.mapper;

import com.mealdrop.dto.FoodRequest;
import com.mealdrop.dto.FoodResponse;
import com.mealdrop.entity.FoodEntity;

public class FoodMapper {

    public static FoodEntity toEntity(FoodRequest request){
          FoodEntity entity=new FoodEntity();
          entity.setName(request.getName());
          entity.setPrice(request.getPrice());
          entity.setDescription(request.getDescription());
          entity.setCategory(request.getCategory());
          return entity;
    }

    public static FoodResponse toResponse(FoodEntity entity){
        FoodResponse response =new FoodResponse();
        response.setId(entity.getId());
        response.setName(entity.getName());
        response.setDescription(entity.getDescription());
        response.setCategory(entity.getCategory());
        response.setPrice(entity.getPrice());
        response.setImageUrl(entity.getImgUrl());
        return response;
    }
}
