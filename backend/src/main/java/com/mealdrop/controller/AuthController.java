package com.mealdrop.controller;

import com.mealdrop.dto.AuthRequestDTO;
import com.mealdrop.dto.AuthResponseDTO;
import com.mealdrop.service.AppUserDetailsService;
import com.mealdrop.service.UserServiceImp;
import com.mealdrop.util.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.core.userdetails.UserDetails;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService appUserDetailsService;
    private final JwtUtils jwtUtil;
    private final UserServiceImp profileService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequestDTO request) {
        try {
            authenticate(request.getEmail(), request.getPassword());
            // JWT token generation part
            final UserDetails userDetails = appUserDetailsService.loadUserByUsername(request.getEmail());
            final String token = jwtUtil.generateToken(userDetails);
            // Cookies work. (This is how the test url getting jwt in the form of cookies )
            ResponseCookie cookie = ResponseCookie.from("jwt", token).httpOnly(true).path("/")
                    .maxAge(Duration.ofDays(1)).sameSite("Strict").build();
            return ResponseEntity.ok().header("Set-cookie", cookie.toString())
                    .body(new AuthResponseDTO(request.getEmail(), token));

        } catch (BadCredentialsException ex) {
            Map<String, Object> errors = new HashMap<>();
            errors.put("error", true);
            errors.put("message", "either email is wrong or password is wrong");
            return new ResponseEntity<Map<String, Object>>(errors, HttpStatus.BAD_REQUEST);
        } catch (DisabledException ex) {
            Map<String, Object> errors = new HashMap<>();
            errors.put("error", true);
            errors.put("message", "User Account is disabled");
            return new ResponseEntity<Map<String, Object>>(errors, HttpStatus.UNAUTHORIZED);
        } catch (Exception ex) {
            Map<String, Object> errors = new HashMap<>();
            errors.put("error", true);
            errors.put("message", "Authentication failed");
            return new ResponseEntity<Map<String, Object>>(errors, HttpStatus.UNAUTHORIZED);
        }
    }
    private void authenticate(String email, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

    }
}
