package com.mealdrop.mapper;

import com.mealdrop.dto.UserRequest;
import com.mealdrop.dto.UserResponse;
import com.mealdrop.entity.UserEntity;


public class UserMapper {

    public static UserEntity getUserEntity(UserRequest req) {
        return UserEntity.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(req.getPassword())
                .build();
    }

    public static UserResponse getUserResponse(UserEntity registerUser) {
        return UserResponse
                .builder()
                .id(registerUser.getId())
                .name(registerUser.getName())
                .email(registerUser.getEmail())
                .build();
    }
}
