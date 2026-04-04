package com.mealdrop.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Order_ItemsDTO {

    private String foodId;
    private Integer quantity;
    private double price;
    private String category;
    private String imageUrl;
    private String description;
    private String name;

}
