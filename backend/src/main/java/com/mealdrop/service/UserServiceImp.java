package com.mealdrop.service;

import com.mealdrop.dto.UserRequest;
import com.mealdrop.dto.UserResponse;
import com.mealdrop.entity.UserEntity;
import com.mealdrop.mapper.UserMapper;
import com.mealdrop.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenthicationFacade authenthicationFacade;

    @Override
    public UserResponse registerUser(UserRequest req) {
        req.setPassword(passwordEncoder.encode(req.getPassword()));
        UserEntity entity = UserMapper.getUserEntity(req);
        UserEntity saveUser = userRepository.save(entity);
        return UserMapper.getUserResponse(saveUser);
    }

    @Override
    public String findByUserId() {
        String loggedInUserEmail = authenthicationFacade.getAuthentication().getName();
        UserEntity loggedInUser = userRepository.findByEmail(loggedInUserEmail).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return loggedInUser.getId();
    }


}
