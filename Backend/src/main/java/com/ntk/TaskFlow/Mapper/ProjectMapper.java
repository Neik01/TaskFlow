package com.ntk.TaskFlow.Mapper;


import com.ntk.TaskFlow.DTO.CollaboratorDTO;
import com.ntk.TaskFlow.DTO.ProjectDTO;
import com.ntk.TaskFlow.DTO.TaskDTO;
import com.ntk.TaskFlow.DTO.UserDTO;
import com.ntk.TaskFlow.Entity.Collaborator;
import com.ntk.TaskFlow.Entity.Project;
import com.ntk.TaskFlow.Entity.Task;
import com.ntk.TaskFlow.Entity.User;
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
}
