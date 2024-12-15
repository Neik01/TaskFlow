package com.ntk.TaskFlow.Controller;


import com.ntk.TaskFlow.DTO.CollaboratorDTO;
import com.ntk.TaskFlow.Entity.Collaborator;
import com.ntk.TaskFlow.Mapper.ProjectMapper;
import com.ntk.TaskFlow.Service.CollaboratorService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/collaborators")
public class CollaboratorController {

    private final CollaboratorService collaboratorService;

    private final ProjectMapper mapper;
    @PostMapping
    public ResponseEntity<CollaboratorDTO> create(@RequestBody  Collaborator collaborator){
        Collaborator collaborator1 = this.collaboratorService.createCollaborator(collaborator);

        return new ResponseEntity<>(mapper.mapCollaboratorToDTO(collaborator1), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CollaboratorDTO>> getAll(){
        List<Collaborator> collaborators = this.collaboratorService.getAllCollaborators();
        return new ResponseEntity<>(mapper.mapListCollaboratorToListDTO(collaborators),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CollaboratorDTO> getById(@PathVariable int id){
        Optional<Collaborator> collaborator = collaboratorService.getCollaboratorById(id);
        return collaborator.map(collaborator1 -> new ResponseEntity<>(mapper.mapCollaboratorToDTO(collaborator1),HttpStatus.FOUND))
                .orElseGet(()-> ResponseEntity.notFound().build());
    }
}
