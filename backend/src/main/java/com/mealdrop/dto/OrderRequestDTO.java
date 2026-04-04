package com.mealdrop.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderRequestDTO {

    private List<Order_ItemsDTO> orderItems;
    private String userAddress;
    private Double amount;
    private String email;
    private String phoneNumber;
    private String orderStatus;

}
