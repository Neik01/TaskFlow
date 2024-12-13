package com.ntk.TaskFlow.Repository;

import com.ntk.TaskFlow.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}