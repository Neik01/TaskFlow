package com.ntk.TaskFlow.DTO.Request;

import com.ntk.TaskFlow.Entity.TaskPriority;
import com.ntk.TaskFlow.Entity.TaskStatus;

import java.time.LocalDateTime;

public record UpdateTaskReq(int id, String title, String description,
                            TaskPriority priority, int boardId, int stageId, LocalDateTime deadline,
                            TaskStatus status) {
}
