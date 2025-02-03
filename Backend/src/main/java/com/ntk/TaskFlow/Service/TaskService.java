package com.ntk.TaskFlow.Service;

import com.ntk.TaskFlow.DTO.Request.ChangeTaskPosReq;
import com.ntk.TaskFlow.DTO.Request.CreateTaskReq;
import com.ntk.TaskFlow.DTO.Request.UpdateTaskReq;
import com.ntk.TaskFlow.Entity.*;
import com.ntk.TaskFlow.Repository.BoardRepository;
import com.ntk.TaskFlow.Repository.BoardStageRepository;
import com.ntk.TaskFlow.Repository.TaskRepository;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.objenesis.ObjenesisException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    private final BoardRepository boardRepository;

    private final BoardStageRepository boardStageRepository;

    public Optional<Task> createTask(CreateTaskReq req) {

        Optional<Board> pr = this.boardRepository.findById(req.boardId());
        Optional<Task> t =Optional.empty();
        if (pr.isPresent()){
            Optional<BoardStage> st = this.boardStageRepository.findById(req.stageId());
            Board board = pr.get();

            Task task = new Task();

            task.setPriority(req.priority());
            task.setTitle(req.title());
            task.setDescription(req.description());
            task.setBoard(board);
            task.setDeadline(req.deadline());

            if (st.isPresent()){
                BoardStage stage = st.get();
                task.setStage(stage);
                task.setPositionInStage(stage.getTask().toArray().length+1);
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

    public HashMap<String,List<Task>> changeTaskPos (ChangeTaskPosReq req){
        List<Integer> prevIds = req.prevStage().keySet().stream().toList();
        List<Integer> currIds = req.currentStage().keySet().stream().toList();
        List<Task> currTask = this.taskRepository.findByIdIn(currIds);
        List<Task> prevTask = this.taskRepository.findByIdIn(prevIds);
        BoardStage prevStage = this.boardStageRepository.findById(req.prevStageId())
                .orElseThrow(()->new IllegalArgumentException("Cannot find stage with id:"+req.prevStageId()));

        BoardStage currStage = this.boardStageRepository.findById(req.currentStageId())
                .orElseThrow(()->new IllegalArgumentException("Cannot find stage with id:"+req.currentStageId()));

        currTask.forEach(task ->{
            task.setStage(currStage);
            task.setPositionInStage(req.currentStage().get(task.getId()));
        });

        prevTask.forEach(task -> {

            task.setPositionInStage(req.prevStage().get(task.getId()));
        });


        HashMap<String,List<Task>> result = new HashMap<>();
        result.put("previous", this.taskRepository.saveAll(prevTask));
        result.put("current",this.taskRepository.saveAll(currTask));

        return result;
    }

    public Task updateTask(UpdateTaskReq req){
       Task task = this.taskRepository.findById(req.id())
               .orElseThrow(()->new IllegalArgumentException("Cannot find task with id: "+req.id()));

       Board board = this.boardRepository.findById(req.boardId())
               .orElseThrow(()->new IllegalArgumentException("Cannot find board with id:"+req.boardId()));

       BoardStage stage = this.boardStageRepository.findById(req.stageId())
               .orElseThrow(()->new IllegalArgumentException("Cannot find stage with id: "+req.stageId()));

       task.setTitle(req.title());
       task.setPriority(req.priority());
       task.setDescription(req.description());
       task.setDeadline(req.deadline());
       task.setStatus(req.status());
       task.setBoard(board);
       task.setStage(stage);

       return this.taskRepository.save(task);
    }
}