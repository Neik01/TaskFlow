package com.ntk.TaskFlow.DTO.Request;

import com.ntk.TaskFlow.Entity.TaskPriority;
import com.ntk.TaskFlow.Entity.TaskStatus;

import java.time.LocalDateTime;

public record CreateTaskReq(String title, String description, TaskPriority priority, TaskStatus status, int projectId, int stageId, LocalDateTime deadline) {
}
