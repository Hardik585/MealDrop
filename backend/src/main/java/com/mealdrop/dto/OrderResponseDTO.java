package com.mealdrop.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OrderResponseDTO {

    private String id;
    private String userId;
    private String userAddress;
    private String phoneNumber;
    private String email;
    private Double amount;
    private String paymentStatus;
    private String razorpayOrderId;
    private String orderStatus;
    private List<Order_ItemsDTO> orderItems;
}