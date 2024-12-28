package com.ntk.TaskFlow.Service;

import com.ntk.TaskFlow.Entity.Task;
import com.ntk.TaskFlow.Entity.TaskPriority;
import com.ntk.TaskFlow.Entity.TaskStatus;
import com.ntk.TaskFlow.Repository.TaskRepository;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public Task createTask(Task task) {


        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(int id) {
        return taskRepository.findById(id);
    }

    public void deleteTask(int id) {
        taskRepository.deleteById(id);
    }

    public List<Task> findByTitleOrDescriptionContaining(String keyword){
        return this.taskRepository.findByTitleOrDescriptionContaining(keyword);
    }

    public List<Task> findByStatusAndPriority(@Nullable TaskStatus status,@Nullable TaskPriority priority){
        return this.taskRepository.findByStatusAndPriority(status,priority);
    }
}