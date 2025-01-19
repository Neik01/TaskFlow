package com.ntk.TaskFlow.Service;


import com.ntk.TaskFlow.Entity.Collaborator;
import com.ntk.TaskFlow.Repository.CollaboratorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CollaboratorService {

    private final CollaboratorRepository collaboratorRepository;
    private final TaskService taskService;

    public Collaborator createCollaborator(Collaborator collaborator){



        return this.collaboratorRepository.save(collaborator);
    }
    public List<Collaborator> getAllCollaborators() {
        return collaboratorRepository.findAll();
    }

    public Optional<Collaborator> getCollaboratorById(int id) {
        return collaboratorRepository.findById(id);
    }

    public void deleteCollaborator(int id) {
        collaboratorRepository.deleteById(id);
    }
}
