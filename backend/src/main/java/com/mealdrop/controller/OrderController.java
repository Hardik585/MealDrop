package com.mealdrop.controller;


import com.mealdrop.dto.OrderRequestDTO;
import com.mealdrop.dto.OrderResponseDTO;
import com.mealdrop.service.OrderService;
import com.razorpay.RazorpayException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/orders")
@AllArgsConstructor
@CrossOrigin("*")
public class OrderController {

    private final OrderService service;

    @PostMapping("/create")
    public OrderResponseDTO createOrderWithPayment(@RequestBody OrderRequestDTO request) throws RazorpayException {
        return service.createOrderWithPayment(request);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> paymentData) {
        service.verifyPayment(paymentData, "paid");
        return ResponseEntity.ok().build();
    }

    @GetMapping("/get")
    public ResponseEntity<?> getUserOrder() {
        return ResponseEntity.ok().body(service.getUserOrders());
    }

    @DeleteMapping("/delete/{orderId}")
    public ResponseEntity<?> deleteUserOrders(@PathVariable String orderId) {
        service.removeOrder(orderId);
        return ResponseEntity.ok().build();
    }

    //admin panel
    @GetMapping("/get/all")
    public ResponseEntity<?> getAllOrders() {
        return ResponseEntity.ok().body(service.getAllOrders());
    }

//admin panel
    @PatchMapping("/status/update/{orderId}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable String orderId,@RequestParam String status) {
        service.updateOrderStatus(orderId, status);
        return ResponseEntity.ok().build();
    }
}
