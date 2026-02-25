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

@Service
@AllArgsConstructor
public class FoodServiceImp implements FoodService {

    private FoodRepo repo;
    private ImageUploadService imgService;

    @Override
    public FoodResponse addFood(FoodRequest foodRequest, MultipartFile file) {
        ImageUploadResult imageResult = null;
        try {
             imageResult= imgService.uploadImage(file);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
        FoodEntity newEntity = FoodMapper.toEntity(foodRequest);
        newEntity.setImgUrl(imageResult.getFileUrl());
        newEntity.setImgUrlId(imageResult.getFileId());
        FoodEntity saved = repo.save(newEntity);
        return FoodMapper.toResponse(saved);
    }
}
