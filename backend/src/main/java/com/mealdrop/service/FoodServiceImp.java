package com.mealdrop.service;

import com.mealdrop.dto.FoodRequest;
import com.mealdrop.dto.FoodResponse;
import com.mealdrop.dto.ImageUploadResult;
import com.mealdrop.entity.FoodEntity;
import com.mealdrop.mapper.FoodMapper;
import com.mealdrop.repository.FoodRepo;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@AllArgsConstructor
public class FoodServiceImp implements FoodService {

    private FoodRepo repo;
    private ImageUploadService imgService;

    @Override
    public FoodResponse addFood(FoodRequest foodRequest, MultipartFile file) {
        ImageUploadResult imageResult = null;
        try {
            imageResult = imgService.uploadImage(file);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
        FoodEntity newEntity = FoodMapper.toEntity(foodRequest);
        newEntity.setImgUrl(imageResult.getFileUrl());
        newEntity.setImgUrlId(imageResult.getFileId());
        FoodEntity saved = repo.save(newEntity);
        return FoodMapper.toResponse(saved);
    }

    @Override
    public List<FoodResponse> getFoods() {
        List<FoodEntity> entityList = repo.findAll();
        return entityList.stream().map(FoodMapper::toResponse).toList();
    }

    @Override
    public FoodResponse getFood(String id) {
        FoodEntity foodEntity = repo.findById(id).orElseThrow(() -> new RuntimeException("Food not found with the id : " + id));
        return FoodMapper.toResponse(foodEntity);
    }

    @Override
    public void deleteFood(String id) {
        FoodEntity foodEntity = repo.findById(id).orElseThrow(() -> new RuntimeException("Food not found with the id : " + id));
        boolean isImageDeleted = imgService.imageDelete(foodEntity.getImgUrlId());
        if (isImageDeleted) {
            repo.delete(foodEntity);
        }
    }
}
