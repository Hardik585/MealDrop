package com.mealdrop.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartResponseDTO {

    private String id;
    private String userId;
    private Map<String, Integer> items = new HashMap<>();

}
