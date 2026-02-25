package com.mealdrop.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Setter
@Getter
@Component
public class ImageUploadResult {

    private String fileId;
    private String fileUrl;
}
