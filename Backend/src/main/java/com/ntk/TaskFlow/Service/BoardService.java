package com.ntk.TaskFlow.Service;

import com.ntk.TaskFlow.Entity.Board;
import com.ntk.TaskFlow.Entity.BoardStage;
import com.ntk.TaskFlow.Repository.BoardRepository;
import com.ntk.TaskFlow.Repository.BoardStageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardStageRepository boardStageRepository;

    public Board createBoard(String projectName, String projectDescription){
        Board newBoard = new Board();
        newBoard.setName(projectName);
        newBoard.setDescription(projectDescription);
        return this.boardRepository.save(newBoard);
    }
    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    public Optional<Board> getProjectById(int id) {
        return boardRepository.findById(id);
    }

    public void deleteProject(int id) {
        boardRepository.deleteById(id);
    }

    public Optional<Board> createStage(String stageName, int projectId){

        Optional<Board> pr = this.boardRepository.findById(projectId);
        if (pr.isPresent()){
            BoardStage boardStage = new BoardStage();
            Board board = pr.get();

            boardStage.setName(stageName);
            boardStage.setBoard(board);

            board.addStage(boardStage);

            this.boardStageRepository.save(boardStage);
            this.boardRepository.save(board);
        }
        return pr;
    }
}
