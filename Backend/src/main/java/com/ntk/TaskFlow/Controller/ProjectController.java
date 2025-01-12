package com.ntk.TaskFlow.Controller;


import com.ntk.TaskFlow.DTO.ProjectDTO;
import com.ntk.TaskFlow.DTO.Request.CreateProjectReq;
import com.ntk.TaskFlow.DTO.Request.CreateStagesReq;
import com.ntk.TaskFlow.Entity.Project;
import com.ntk.TaskFlow.Mapper.ProjectMapper;
import com.ntk.TaskFlow.Service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProjectController {

    private final ProjectService projectService;
    private final ProjectMapper mapper;

    @PostMapping
    public ResponseEntity<ProjectDTO> createProject(@RequestBody CreateProjectReq projectReq) {
        Project createdProject = projectService.createProject(projectReq.name(),projectReq.description());
        return new ResponseEntity<>(mapper.mapProjectToDTO(createdProject), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return new ResponseEntity<>(mapper.mapListProjectToListDTO(projects), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable int id) {
        Optional<Project> project = projectService.getProjectById(id);
        return project.map(project1 -> new ResponseEntity<>(mapper.mapProjectToDTO(project1),HttpStatus.OK))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable int id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/createStage")
    public ResponseEntity<?> createStages(@RequestBody CreateStagesReq req){
        Optional<Project> pr = this.projectService.createStage(req.name(), req.projectId());
        return pr.map(project1 -> new ResponseEntity<>(mapper.mapProjectToDTO(project1),HttpStatus.CREATED))
                .orElseGet(() -> ResponseEntity.notFound().build());

    }
}
