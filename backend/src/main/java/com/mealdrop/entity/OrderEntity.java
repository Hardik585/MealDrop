package com.mealdrop.entity;

import com.mealdrop.dto.Order_ItemsDTO;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "order")
@Data
@Builder
public class OrderEntity {

    @Id
    private String id;
    private String userId;
    private String email;
    private String phoneNumber;
    private String userAddress;
    private List<Order_ItemsDTO> orderItems;
    private Double amount;
    private String paymentStatus;
    private String razorpayOrderId;
    private String razorpaySignature;
    private String razorpayPaymentId;
    private String orderStatus;

}
