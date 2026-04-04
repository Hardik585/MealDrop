package com.mealdrop.mapper;


import com.mealdrop.dto.OrderRequestDTO;
import com.mealdrop.dto.OrderResponseDTO;
import com.mealdrop.entity.OrderEntity;

public class OrderMapper {

    public static OrderEntity toEntity(OrderRequestDTO req) {
        return OrderEntity.builder()
                .userAddress(req.getUserAddress())
                .amount(req.getAmount())
                .orderItems(req.getOrderItems())
                .phoneNumber(req.getPhoneNumber())
                .email(req.getEmail())
                .orderStatus(req.getOrderStatus())
                .build();
    }

    public static OrderResponseDTO toOrderResponse(OrderEntity entity) {
        return OrderResponseDTO.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .userAddress(entity.getUserAddress())
                .phoneNumber(entity.getPhoneNumber())
                .amount(entity.getAmount())
                .email(entity.getEmail())
                .razorpayOrderId(entity.getRazorpayOrderId())
                .paymentStatus(entity.getPaymentStatus())
                .orderStatus(entity.getOrderStatus())
                .email(entity.getEmail())
                .phoneNumber(entity.getPhoneNumber())
                .orderItems(entity.getOrderItems())
                .build();
    }
}
