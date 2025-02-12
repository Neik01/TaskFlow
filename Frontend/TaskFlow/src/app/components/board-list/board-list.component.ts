import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { BoardResponse, Workspace } from 'src/app/responses/ServerResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {
  boards: BoardResponse[] = [];
  isLoading = true;
  isCreateBoardModalOpen = false;
  wsId: number =0;
  workspace!: Workspace
  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute,
    private ws: WorkspaceService
  ) {}

  ngOnInit() {

    this.route.paramMap.subscribe(value =>{
      if (value.get('wsId')){

        this.wsId=Number.parseInt(value.get('wsId')!)
        this.loadBoards(this.wsId);
      }
    });

  }

  loadBoards(id:number) {
    this.isLoading = true;
    this.ws.getWorkspaceById(id).subscribe({
      next: (ws) => {
        this.workspace = ws
        this.boards = ws.boards;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading boards:', error);
        this.isLoading = false;
      }
    });
  }

  navigateToBoard(boardId: number) {
    
    
    this.router.navigate(['/workspace',this.wsId,'boards', boardId]);
  }

  openCreateBoardModal() {
    this.isCreateBoardModalOpen = true;
  }
} 