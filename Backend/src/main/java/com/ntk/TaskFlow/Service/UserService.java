package com.ntk.TaskFlow.Service;

import com.ntk.TaskFlow.Entity.User;
import com.ntk.TaskFlow.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Optional<User> getUserById(int id){
        return this.userRepository.findById(id);
    }

    public User register(String email, String name, String password){
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        User savedUser = this.userRepository.save(user);
        return  savedUser;
    }



}
