package com.mealdrop.service;


import com.mealdrop.dto.CartRequestDTO;
import com.mealdrop.dto.CartResponseDTO;
import com.mealdrop.entity.CartEntity;
import com.mealdrop.mapper.CartMapper;
import com.mealdrop.repository.CartRepository;
import com.mealdrop.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartServiceImp implements CartService {

    private final CartRepository cartRepository;
    private final UserServiceImp userService;

    @Override
    public CartResponseDTO addToCart(CartRequestDTO request) {
        String loggedInUserId = userService.findByUserId();
        Optional<CartEntity> cartOptional = cartRepository.findByUserId(loggedInUserId);
        CartEntity cartEntity = cartOptional.orElseGet(() -> new CartEntity(loggedInUserId, new HashMap<>()));
        Map<String, Integer> cartItems = cartEntity.getItems();
        cartItems.put(request.getFoodId(), cartItems.getOrDefault(request.getFoodId(), 0) + 1);
        cartEntity.setItems(cartItems);
        CartEntity savedCart = cartRepository.save(cartEntity);
        return CartMapper.toCartResponse(savedCart);
    }

    @Override
    public CartResponseDTO getCart() {
        String loggedInUserId = userService.findByUserId();
        Optional<CartEntity> cartOptional = cartRepository.findByUserId(loggedInUserId);
        CartEntity cart = cartOptional.orElseGet(() -> new CartEntity(loggedInUserId, new HashMap<>()));
        return CartMapper.toCartResponse(cart);
    }

    @Override
    public void deleteCart() {
        String loggedInUserId = userService.findByUserId();
        cartRepository.deleteByUserId(loggedInUserId);
    }

    @Override
    public CartResponseDTO removeFromCart(CartRequestDTO req) {
        String loggedInUserId = userService.findByUserId();
        CartEntity entity = cartRepository.findByUserId(loggedInUserId).orElseThrow(() -> new RuntimeException("Cart not found"));
        Map<String, Integer> cartItems = entity.getItems();
        if (cartItems.containsKey(req.getFoodId())) {
            int currQuantity = cartItems.get(req.getFoodId());
            if (currQuantity > 0) {
                cartItems.put(req.getFoodId(), --currQuantity);
            } else {
                cartItems.remove(req.getFoodId());
            }
            CartEntity updateEntity = cartRepository.save(entity);
        }
          return CartMapper.toCartResponse(entity);
    }
}
