package com.ntk.TaskFlow.Repository;

import com.ntk.TaskFlow.Entity.BoardStage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardStageRepository extends JpaRepository<BoardStage,Integer> {

    List<BoardStage> findByBoardId(int id);
    List<BoardStage> findByIdIn(List<Integer> ids);
}
