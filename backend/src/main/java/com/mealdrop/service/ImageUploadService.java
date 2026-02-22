package com.mealdrop.service;


import java.io.IOException;
import java.util.Map;

import com.mealdrop.dto.ImageUploadResult;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class ImageUploadService {

    private final Cloudinary cloudinary;
    private ImageUploadResult imageUploadResult;
    public ImageUploadService(Cloudinary cloudinary , ImageUploadResult imageUploadResult) {
        this.cloudinary = cloudinary;
        this.imageUploadResult = imageUploadResult;
    }

    public ImageUploadResult uploadImage(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.emptyMap()
        );
           imageUploadResult.setFileId(uploadResult.get("public_id").toString());
           imageUploadResult.setFileUrl(uploadResult.get("secure_url").toString());
           return imageUploadResult;
    }

}

