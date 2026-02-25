package com.mealdrop.entity;



import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "food")
public class FoodEntity {

    @Id
    private String id;
    private String name;
    private String description;
    private double price;
    private  String category;
    private String imgUrl;
    private String imgUrlId;

}
