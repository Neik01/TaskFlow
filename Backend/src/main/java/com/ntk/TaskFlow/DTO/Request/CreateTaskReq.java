package com.ntk.TaskFlow.DTO.Request;

import com.ntk.TaskFlow.Entity.TaskPriority;

import java.time.LocalDateTime;

public record CreateTaskReq(String title, String description, TaskPriority priority, int projectId, int stageId, LocalDateTime deadline) {
}
