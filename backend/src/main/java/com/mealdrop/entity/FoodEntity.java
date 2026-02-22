package com.mealdrop.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="Foods")
public class FoodEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    private double price;
    private  String category;
    private String imgUrl;
    private String imgUrlId;

}
