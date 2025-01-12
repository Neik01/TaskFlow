package com.ntk.TaskFlow.Controller;

import com.ntk.TaskFlow.DTO.Request.CreateTaskReq;
import com.ntk.TaskFlow.DTO.TaskDTO;
import com.ntk.TaskFlow.Entity.Task;
import com.ntk.TaskFlow.Entity.TaskPriority;
import com.ntk.TaskFlow.Mapper.ProjectMapper;
import com.ntk.TaskFlow.Service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;
    private final ProjectMapper mapper;


    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody CreateTaskReq req) {
        return taskService.createTask(req)
                .map(task -> new ResponseEntity<>(mapper.mapTaskToDTO(task), HttpStatus.CREATED))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return new ResponseEntity<>(mapper.mapListTaskToListDTO(tasks), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable int id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.map(task1 -> new ResponseEntity<>(mapper.mapTaskToDTO(task1),HttpStatus.FOUND))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable int id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<TaskDTO>> findTasksByTitleOrDescription(@PathVariable String keyword){

        List<Task> result = this.taskService.findByTitleOrDescriptionContaining(keyword);

        return new ResponseEntity<>(mapper.mapListTaskToListDTO(result),HttpStatus.OK);
    }

    @GetMapping("/filterByPriority")
    public ResponseEntity<List<TaskDTO>> findTasksByStatusAndPriority(TaskPriority priority){

        List<Task> result = this.taskService.findByStatusAndPriority(priority);

        return new ResponseEntity<>(mapper.mapListTaskToListDTO(result),HttpStatus.OK);
    }
}