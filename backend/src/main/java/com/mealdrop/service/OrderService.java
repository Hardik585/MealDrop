package com.mealdrop.service;

import com.mealdrop.dto.OrderRequestDTO;
import com.mealdrop.dto.OrderResponseDTO;
import com.mealdrop.entity.OrderEntity;
import com.razorpay.RazorpayException;

import java.util.List;
import java.util.Map;

public interface OrderService {
    OrderResponseDTO createOrderWithPayment(OrderRequestDTO request) throws RazorpayException;

    void verifyPayment(Map<String, String> paymentData, String status);

    List<OrderResponseDTO> getUserOrders();

    void removeOrder(String orderId);

    List<OrderResponseDTO> getAllOrders();

    void updateOrderStatus(String orderId, String status);
}
