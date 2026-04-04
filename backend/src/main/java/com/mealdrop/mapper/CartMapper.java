package com.mealdrop.mapper;

import com.mealdrop.dto.CartResponseDTO;
import com.mealdrop.entity.CartEntity;

public class CartMapper {

    public static CartResponseDTO toCartResponse(CartEntity savedEntity) {
        return CartResponseDTO.builder()
                .id(savedEntity.getId())
                .items(savedEntity.getItems())
                .userId(savedEntity.getUserId())
                .build();
    }
}
