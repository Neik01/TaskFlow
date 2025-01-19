package com.ntk.TaskFlow.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String description;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "board",cascade = CascadeType.ALL)
    private List<Task> tasks;

    @OneToMany(mappedBy = "board",cascade = CascadeType.ALL)
    private List<BoardStage> stages;
    // Getters and setters


    public void addStage(BoardStage stage){
        if (this.stages==null){
            this.stages = new ArrayList<>();
        }
        stages.add(stage);
    }
}
