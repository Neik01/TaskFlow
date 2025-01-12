package com.ntk.TaskFlow.Mapper;


import com.ntk.TaskFlow.DTO.*;
import com.ntk.TaskFlow.Entity.*;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    TaskDTO mapTaskToDTO(Task task);

    List<TaskDTO> mapListTaskToListDTO(List<Task> tasks);

    ProjectDTO mapProjectToDTO (Project project);

    List<ProjectDTO> mapListProjectToListDTO(List<Project> projects);

    CollaboratorDTO mapCollaboratorToDTO (Collaborator collaborator);

    List<CollaboratorDTO> mapListCollaboratorToListDTO(List<Collaborator> collaborator);

    UserDTO mapUserToDto(User user);

    ProjectStageDTO mapProjectStageToDto(ProjectStage stage);
}
