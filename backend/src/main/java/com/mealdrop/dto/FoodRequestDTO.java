package com.mealdrop.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodRequestDTO {

    private String name;
    private String description;
    private double price;
    private String category;
}
