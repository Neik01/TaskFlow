package com.ntk.TaskFlow.Service;

import com.ntk.TaskFlow.Entity.ProjectStage;
import com.ntk.TaskFlow.Repository.ProjectStageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectStageService {

    private final ProjectStageRepository projectStageRepository;

    public List<ProjectStage> getAllStagesFromProject(int projectId){

        return this.projectStageRepository.findByProjectId(projectId);
    }
}
