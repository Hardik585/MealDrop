package com.mealdrop.service;

import com.mealdrop.dto.UserRequest;
import com.mealdrop.dto.UserResponse;

public interface UserService {
    UserResponse registerUser(UserRequest req);
      String findByUserId();
}
