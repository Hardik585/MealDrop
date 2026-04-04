package com.mealdrop.service;

import com.mealdrop.dto.OrderRequestDTO;
import com.mealdrop.dto.OrderResponseDTO;
import com.mealdrop.entity.OrderEntity;
import com.mealdrop.mapper.OrderMapper;
import com.mealdrop.repository.CartRepository;
import com.mealdrop.repository.OrderRepo;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImp implements OrderService {

    @Value("${razorpay_key}")
    private String RAZORPAY_KEY;
    @Value("${razorpay_secret}")
    private String RAZORPAY_SECRET;

    private final OrderRepo orderRepo;
    private final UserService userService;
    private final CartRepository cartRepo;

    public OrderServiceImp(OrderRepo orderRepo, UserService userService, CartRepository cartRepo) {
        this.orderRepo = orderRepo;
        this.userService = userService;
        this.cartRepo = cartRepo;
    }


    @Override
    public OrderResponseDTO createOrderWithPayment(OrderRequestDTO request) throws RazorpayException {
        OrderEntity newOrder = OrderMapper.toEntity(request);
        String loggedUserId = userService.findByUserId();
        newOrder.setUserId(loggedUserId);
        newOrder = orderRepo.save(newOrder);

        // create razorpay payment order
        RazorpayClient razorpayClient = new RazorpayClient(RAZORPAY_KEY, RAZORPAY_SECRET);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount",  Math.round(newOrder.getAmount() * 100));
        orderRequest.put("currency", "INR");
        orderRequest.put("payment_capture", 1);
//		  orderRequest.put("", );

        Order razorpayOrder = razorpayClient.orders.create(orderRequest);
        newOrder.setRazorpayOrderId(razorpayOrder.get("id"));
        orderRepo.save(newOrder);

        return OrderMapper.toOrderResponse(newOrder);
    }

    @Override
    public void verifyPayment(Map<String, String> paymentData, String status) {
        String razorpayOrderId = paymentData.get("razorpay_order_id");
        OrderEntity exitingOrder = orderRepo.findByRazorpayOrderId(razorpayOrderId).orElseThrow(() -> new RuntimeException("Order not found"));
        exitingOrder.setPaymentStatus(status);
        exitingOrder.setRazorpaySignature(paymentData.get("razorpay_signature"));
        exitingOrder.setRazorpayPaymentId(paymentData.get("razorpay_payment_id"));
        orderRepo.save(exitingOrder);
        if ("paid".equalsIgnoreCase(status)) {
            cartRepo.deleteByUserId(exitingOrder.getUserId());
        }
    }

    @Override
    public List<OrderResponseDTO> getUserOrders() {
        String loggedUserId = userService.findByUserId();
        List<OrderEntity> listOfOrders = orderRepo.findByUserId(loggedUserId);
        return listOfOrders.stream().map(entity -> OrderMapper.toOrderResponse(entity)).toList();
    }

    @Override
    public void removeOrder(String orderId) {
        orderRepo.deleteById(orderId);
    }

    @Override
    public List<OrderResponseDTO> getAllOrders() {
        List<OrderEntity> list = orderRepo.findAll();
        return list.stream().map(entity -> OrderMapper.toOrderResponse(entity)).toList();
    }

    @Override
    public void updateOrderStatus(String orderId, String status) {
        OrderEntity entity = orderRepo.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        entity.setOrderStatus(status);
        orderRepo.save(entity);
    }

}
