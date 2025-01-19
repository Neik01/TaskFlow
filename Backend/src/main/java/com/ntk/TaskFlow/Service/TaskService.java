package com.ntk.TaskFlow.Service;

import com.ntk.TaskFlow.DTO.Request.ChangeTaskPosReq;
import com.ntk.TaskFlow.DTO.Request.CreateTaskReq;
import com.ntk.TaskFlow.Entity.*;
import com.ntk.TaskFlow.Repository.BoardRepository;
import com.ntk.TaskFlow.Repository.BoardStageRepository;
import com.ntk.TaskFlow.Repository.TaskRepository;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    private final BoardRepository projectRepository;

    private final BoardStageRepository boardStageRepository;

    public Optional<Task> createTask(CreateTaskReq req) {

        Optional<Board> pr = this.projectRepository.findById(req.projectId());
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
            task.setStatus(req.status());
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
        Optional<BoardStage> prevStage = this.boardStageRepository.findById(req.prevStageId());

        Optional<BoardStage> currStage = this.boardStageRepository.findById(req.currentStageId());

        //if current stage id of current/destination stage equals -1 means it not belong to any stage
        //set stage to null
        if (req.currentStageId()==-1){
            currTask.forEach(task -> {
                task.setStage(null);
                task.setPositionInStage(req.currentStage().get(task.getId()));
            });
        }
        else if(currStage.isPresent())
            currTask.forEach(task ->{
                task.setStage(currStage.get());
                task.setPositionInStage(req.currentStage().get(task.getId()));
            });
            else
                throw new IllegalArgumentException("Cannot find stage with id:"+req.currentStageId());


        //with the previous/source stage, don't need to update stage, just change order position
        if (prevStage.isPresent()||req.prevStageId()==-1){
            prevTask.forEach(task -> {

                task.setPositionInStage(req.prevStage().get(task.getId()));
            });
        }
        else throw new IllegalArgumentException("Cannot find stage with id:"+req.prevStageId());

        HashMap<String,List<Task>> result = new HashMap<>();
        result.put("previous", this.taskRepository.saveAll(prevTask));
        result.put("current",this.taskRepository.saveAll(currTask));

        return result;
    }
}