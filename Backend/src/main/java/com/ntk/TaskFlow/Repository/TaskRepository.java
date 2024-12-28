package com.ntk.TaskFlow.Repository;

import com.ntk.TaskFlow.Entity.Task;
import com.ntk.TaskFlow.Entity.TaskPriority;
import com.ntk.TaskFlow.Entity.TaskStatus;
import jakarta.annotation.Nullable;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    @Query(value = "Select t from Task t where t.title  LIKE %?1% or t.description LIKE %?1%")
    List<Task> findByTitleOrDescriptionContaining(String keyword);

    List<Task> findByStatusAndPriority(@Nullable TaskStatus status,@Nullable TaskPriority priority);
}