package com.ntk.TaskFlow.DTO.Entities;

import com.ntk.TaskFlow.Entity.TaskPriority;

import java.time.LocalDateTime;

public record TaskDTO(int id, String title, String description, TaskPriority priority,
                      LocalDateTime deadline, LocalDateTime createdAt, LocalDateTime updatedAt,
                      CollaboratorDTO collaborator, BoardStageDTO stage, int positionInStage) {
}
