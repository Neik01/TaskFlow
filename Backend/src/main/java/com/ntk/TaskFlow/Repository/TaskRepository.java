package com.ntk.TaskFlow.Repository;

import com.ntk.TaskFlow.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface TaskRepository extends JpaRepository<Task, Integer> {
}