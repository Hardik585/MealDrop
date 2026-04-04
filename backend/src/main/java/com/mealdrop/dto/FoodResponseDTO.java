package com.mealdrop.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodResponseDTO {

    private String id;
    private String name;
    private String description;
    private double price;
    private String imageUrl;
    private String category;
}
