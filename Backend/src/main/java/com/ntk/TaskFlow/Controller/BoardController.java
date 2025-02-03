package com.ntk.TaskFlow.Controller;


import com.ntk.TaskFlow.DTO.BoardDTO;
import com.ntk.TaskFlow.DTO.Request.ChangeProjectStagePosReq;
import com.ntk.TaskFlow.DTO.Request.CreateBoardReq;
import com.ntk.TaskFlow.DTO.Request.CreateStagesReq;
import com.ntk.TaskFlow.Entity.Board;
import com.ntk.TaskFlow.Mapper.ProjectMapper;
import com.ntk.TaskFlow.Service.BoardService;
import com.ntk.TaskFlow.Service.BoardStageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BoardController {

    private final BoardService boardService;
    private final ProjectMapper mapper;
    private final BoardStageService projectStageService;
    @PostMapping
    public ResponseEntity<BoardDTO> createBoard(@RequestBody CreateBoardReq boardReq) {
        Board createdBoard = boardService.createBoard(boardReq.name(),boardReq.description());
        return new ResponseEntity<>(mapper.mapBoardToDTO(createdBoard), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<BoardDTO>> getAllBoards() {
        List<Board> boards = boardService.getAllBoards();
        return new ResponseEntity<>(mapper.mapListBoardToListDTO(boards), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardDTO> getBoardById(@PathVariable int id) {
        Optional<Board> project = boardService.getBoardById(id);
        return project.map(project1 -> new ResponseEntity<>(mapper.mapBoardToDTO(project1),HttpStatus.OK))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable int id) {
        boardService.deleteBoard(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/createStage")
    public ResponseEntity<?> createStage(@RequestBody CreateStagesReq req){
        Optional<Board> pr = this.boardService.createStage(req.name(), req.boardId());
        return pr.map(project1 -> new ResponseEntity<>(mapper.mapBoardToDTO(project1),HttpStatus.CREATED))
                .orElseGet(() -> ResponseEntity.notFound().build());

    }

    @PutMapping("/updateStage")
    public ResponseEntity<?> updateStage(@RequestBody ChangeProjectStagePosReq req){

        return new ResponseEntity<>(mapper.mapListProjectStageToListDTO(this.projectStageService.changeStagePos(req)),HttpStatus.OK);

    }

    @DeleteMapping("/stages/{id}")
    public ResponseEntity<?> deleteStage(@PathVariable int id) {
        try {
            projectStageService.deleteStage(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/test")
    public String test(){
        return "test ";
    }

}
