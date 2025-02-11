package com.ntk.TaskFlow.Service;

import com.ntk.TaskFlow.Entity.Workspace;
import com.ntk.TaskFlow.Repository.WorkspaceRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;


    public List<Workspace> getAllWorkspaces() {
        return workspaceRepository.findAll();
    }

    public Optional<Workspace> getWorkspaceById(int id) {
        return workspaceRepository.findById(id);
    }

    public Workspace createWorkspace(Workspace workspace) {
        return workspaceRepository.save(workspace);
    }

    public Workspace updateWorkspace(int id, Workspace workspaceDetails) {
        return workspaceRepository.findById(id).map(workspace -> {
            workspace.setName(workspaceDetails.getName());
            workspace.setDescription(workspaceDetails.getDescription());
            return workspaceRepository.save(workspace);
        }).orElseThrow(() -> new EntityNotFoundException("Workspace not found with id " + id));
    }

    public void deleteWorkspace(int id) {
        workspaceRepository.deleteById(id);
    }
}
