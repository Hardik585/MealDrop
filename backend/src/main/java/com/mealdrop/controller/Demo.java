package com.mealdrop.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Demo {

    @GetMapping("/message")
    public String msg(){
        return "Wlm Food Backend";
    }
}
