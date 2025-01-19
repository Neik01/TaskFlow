package com.ntk.TaskFlow.Service;

import com.ntk.TaskFlow.DTO.Request.ChangeProjectStagePosReq;
import com.ntk.TaskFlow.Entity.BoardStage;
import com.ntk.TaskFlow.Repository.BoardStageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardStageService {

    private final BoardStageRepository boardStageRepository;

    public List<BoardStage> getAllStagesFromProject(int projectId){

        return this.boardStageRepository.findByBoardId(projectId);
    }

    public List<BoardStage> changeStagePos(ChangeProjectStagePosReq req){
        List<BoardStage> stages = this.boardStageRepository.findByIdIn(req.stages().keySet().stream().toList());

        stages.forEach(stage-> stage.setPosition(req.stages().get(stage.getId())));

        return this.boardStageRepository.saveAll(stages);
    }
}
