package com.mealdrop.service;

import java.util.List;

import com.mealdrop.entity.UserEntity;
import com.mealdrop.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;




@Service
//@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository repo;

    public AppUserDetailsService(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity existUser = repo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("email does not exist "));
        return new User(existUser.getEmail(), existUser.getPassword(), List.of(new SimpleGrantedAuthority("ROLE_USER")));
    }
}
