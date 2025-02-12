package com.ntk.TaskFlow.Controller;

import com.ntk.TaskFlow.DTO.Entities.WorkspaceDTO;
import com.ntk.TaskFlow.Entity.Workspace;
import com.ntk.TaskFlow.Mapper.ProjectMapper;
import com.ntk.TaskFlow.Service.WorkspaceService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workspaces")
@RequiredArgsConstructor
@CrossOrigin("*")
public class WorkspaceController {

    private final WorkspaceService workspaceService;
    private final ProjectMapper mapper;

    @GetMapping
    public List<WorkspaceDTO> getAllWorkspaces() {
        return mapper.mapListWorkspaceToListDTO(workspaceService.getAllWorkspaces());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkspaceDTO> getWorkspaceById(@PathVariable int id) {
        return workspaceService.getWorkspaceById(id)
                .map(ws -> new ResponseEntity<WorkspaceDTO>(this.mapper.mapWorkspaceToDto(ws),HttpStatus.OK))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<WorkspaceDTO> createWorkspace(@RequestBody Workspace workspace) {
        Workspace createdWorkspace = workspaceService.createWorkspace(workspace);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapper.mapWorkspaceToDto(createdWorkspace));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkspaceDTO> updateWorkspace(@PathVariable int id, @RequestBody Workspace workspaceDetails) {
        try {
            Workspace updatedWorkspace = workspaceService.updateWorkspace(id, workspaceDetails);
            return ResponseEntity.ok(mapper.mapWorkspaceToDto(updatedWorkspace));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkspace(@PathVariable int id) {
        workspaceService.deleteWorkspace(id);
        return ResponseEntity.noContent().build();
    }
}
