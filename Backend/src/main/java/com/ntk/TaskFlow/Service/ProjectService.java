package com.ntk.TaskFlow.Service;

import com.ntk.TaskFlow.Entity.Project;
import com.ntk.TaskFlow.Entity.Task;
import com.ntk.TaskFlow.Repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public Project createProject(String projectName,String projectDescription){
        Project newProject = new Project();
        newProject.setName(projectName);
        newProject.setDescription(projectDescription);
        return this.projectRepository.save(newProject);
    }
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(int id) {
        return projectRepository.findById(id);
    }

    public void deleteProject(int id) {
        projectRepository.deleteById(id);
    }
}
