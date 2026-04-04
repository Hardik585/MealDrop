package com.mealdrop.controller;

import com.mealdrop.dto.CartRequestDTO;
import com.mealdrop.dto.CartResponseDTO;
import com.mealdrop.service.CartServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/cart")
public class CartController {

    private final CartServiceImp cartService;

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody CartRequestDTO request) {
        String foodId = request.getFoodId();
        if (foodId == null || foodId.isEmpty()) {
            return ResponseEntity.badRequest().body("foodId is null");
        }
        CartResponseDTO response = cartService.addToCart(request);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/getcart")
    public ResponseEntity<?> getCart() {
        return ResponseEntity.ok().body(cartService.getCart());
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> deleteCartByUserId() {
        cartService.deleteCart();
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/remove")
    public ResponseEntity<?> deleteCartByFoodId(@RequestBody CartRequestDTO request) {
        String foodId = request.getFoodId();
        if (foodId == null || foodId.isEmpty()) {
            return ResponseEntity.badRequest().body("foodId is null");
        }
        CartResponseDTO response = cartService.removeFromCart(request);
        return ResponseEntity.ok().body(response);
    }
}
