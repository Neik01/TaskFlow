package com.ntk.TaskFlow.DTO;

import java.util.List;

public record ProjectDTO(int id, String name, String description, List<ProjectStageDTO> stages,List<TaskDTO> tasks) {
}
