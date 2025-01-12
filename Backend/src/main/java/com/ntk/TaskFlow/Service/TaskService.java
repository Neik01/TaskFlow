package com.ntk.TaskFlow.Service;

import com.ntk.TaskFlow.DTO.Request.CreateTaskReq;
import com.ntk.TaskFlow.Entity.*;
import com.ntk.TaskFlow.Repository.ProjectRepository;
import com.ntk.TaskFlow.Repository.ProjectStageRepository;
import com.ntk.TaskFlow.Repository.TaskRepository;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    private final ProjectRepository projectRepository;

    private final ProjectStageRepository projectStageRepository;

    public Optional<Task> createTask(CreateTaskReq req) {

        Optional<Project> pr = this.projectRepository.findById(req.projectId());
        Optional<Task> t =Optional.empty();
        if (pr.isPresent()){
            Optional<ProjectStage> st = this.projectStageRepository.findById(req.stageId());
            Project project = pr.get();

            Task task = new Task();

            task.setPriority(req.priority());
            task.setTitle(req.title());
            task.setDescription(req.description());
            task.setProject(project);
            task.setDeadline(req.deadline());

            if (st.isPresent()){
                ProjectStage stage = st.get();
                task.setStage(stage);
            }
            t = Optional.of(taskRepository.save(task));
        }

        return t;
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

    public List<Task> findByStatusAndPriority(@Nullable TaskPriority priority){
        return this.taskRepository.findByPriority(priority);
    }


}