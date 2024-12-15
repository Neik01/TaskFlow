package com.ntk.TaskFlow.Repository;

import com.ntk.TaskFlow.Entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project,Integer> {
}
