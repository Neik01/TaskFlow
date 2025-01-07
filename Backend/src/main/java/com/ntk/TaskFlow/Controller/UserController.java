package com.ntk.TaskFlow.Controller;


import com.ntk.TaskFlow.DTO.Request.RegisterRequest;
import com.ntk.TaskFlow.Entity.User;
import com.ntk.TaskFlow.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @PostMapping
    public User register(@RequestBody RegisterRequest req){
        User user =this.userService.register(req.name(), req.email(), req.password());
        return user;
    }
}
