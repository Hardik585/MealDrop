package com.mealdrop.service;


import org.springframework.security.core.Authentication;

public interface AuthenthicationFacade {

    Authentication getAuthentication();
}
