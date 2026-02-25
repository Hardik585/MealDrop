package com.mealdrop.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Configuration
public class CloudinaryConfig {

    @Value("${cloudinary.cloud-name}")
    private String cloud_Name;

    @Value("${cloudinary.api-key}")
    private String api_Key;

    @Value("${cloudinary.api-secret}")
    private String api_Secret;

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(
                ObjectUtils.asMap(
                        "cloud_name", cloud_Name,
                        "api_key", api_Key,
                        "api_secret", api_Secret));
    }
}

