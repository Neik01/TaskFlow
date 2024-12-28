package com.ntk.TaskFlow.DTO.Request;

import com.ntk.TaskFlow.Entity.TaskPriority;
import com.ntk.TaskFlow.Entity.TaskStatus;

public record StatusAndPriorityFilter(TaskStatus status, TaskPriority priority) {
}
