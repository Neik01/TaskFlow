package com.ntk.TaskFlow.Repository;

import com.ntk.TaskFlow.Entity.ProjectStage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectStageRepository extends JpaRepository<ProjectStage,Integer> {

    List<ProjectStage> findByProjectId(int id);
}
