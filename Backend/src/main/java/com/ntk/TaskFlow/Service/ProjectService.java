package com.ntk.TaskFlow.Service;

import com.ntk.TaskFlow.Entity.Project;
import com.ntk.TaskFlow.Entity.ProjectStage;
import com.ntk.TaskFlow.Repository.ProjectRepository;
import com.ntk.TaskFlow.Repository.ProjectStageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectStageRepository projectStageRepository;

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

    public Optional<Project> createStage(String stageName, int projectId){

        Optional<Project> pr = this.projectRepository.findById(projectId);
        if (pr.isPresent()){
            ProjectStage projectStage = new ProjectStage();
            Project project = pr.get();

            projectStage.setName(stageName);
            projectStage.setProject(project);

            project.addStage(projectStage);

            this.projectStageRepository.save(projectStage);
            this.projectRepository.save(project);
        }
        return pr;
    }
}
