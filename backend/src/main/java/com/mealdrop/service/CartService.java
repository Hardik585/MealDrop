package com.mealdrop.service;

import com.mealdrop.dto.CartRequestDTO;
import com.mealdrop.dto.CartResponseDTO;
import com.mealdrop.entity.CartEntity;

import java.util.Optional;

public interface CartService {
    CartResponseDTO addToCart(CartRequestDTO request);

    CartResponseDTO getCart();

    void deleteCart();

    CartResponseDTO removeFromCart(CartRequestDTO req);
}
