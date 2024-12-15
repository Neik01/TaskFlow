package com.ntk.TaskFlow.DTO;

import com.ntk.TaskFlow.Entity.TaskPriority;
import com.ntk.TaskFlow.Entity.TaskStatus;
import com.ntk.TaskFlow.Entity.User;

import java.time.LocalDateTime;

public record TaskDTO(int id, String title, String description, TaskStatus status, TaskPriority priority,
                      LocalDateTime deadline, LocalDateTime createdAt, LocalDateTime updatedAt,
                      CollaboratorDTO collaborator) {
}
