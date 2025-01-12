package com.ntk.TaskFlow.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Task> tasks;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Project> projects;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Collaborator> collaborators;
    // Getters and setters

}
