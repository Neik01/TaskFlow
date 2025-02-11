package com.ntk.TaskFlow.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Workspace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String description;

    @OneToMany(mappedBy = "workspace")
    private List<Board> boards;

    public void addBoard(Board board){
        if(boards == null)
            boards = new ArrayList<>();

        boards.add(board);
    }
}
