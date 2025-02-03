import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { BoardResponse } from 'src/app/responses/ServerResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {
  boards: BoardResponse[] = [];
  isLoading = true;
  isCreateBoardModalOpen = false;

  constructor(
    private boardService: BoardService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBoards();
  }

  loadBoards() {
    this.isLoading = true;
    this.boardService.getAllBoard().subscribe({
      next: (boards) => {
        this.boards = boards;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading boards:', error);
        this.isLoading = false;
      }
    });
  }

  navigateToBoard(boardId: number) {
    this.router.navigate(['/boards', boardId]);
  }

  openCreateBoardModal() {
    this.isCreateBoardModalOpen = true;
  }
} 