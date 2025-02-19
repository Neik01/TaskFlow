import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { BoardResponse, Workspace } from 'src/app/responses/ServerResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceService } from 'src/app/services/workspace.service';


@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit{
  boards: BoardResponse[] = [];
  isLoading = true;
  isCreateBoardModalOpen = false;
  workspace: Workspace|null = null;

  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute,
    private ws: WorkspaceService,

  ) {}

  ngOnInit() {
    //workspace id
    const id =this.route.snapshot.params['wsId'];

    if(id){
      this.ws.setWorkspaceId(+id);
    }

    this.route.params.subscribe(params =>{
      const wsId = params['wsId'] 
      if(wsId){
        this.loadBoards(wsId);
        
      }
    })
  }



  loadBoards(id: number|undefined) {
    this.isLoading = true;
    if(id)
      this.ws.getWorkspaceById(id).subscribe({
        next: (ws) => {
          this.workspace = ws;
          this.boards = ws.boards;
          this.isLoading = false;
          this.ws.setWorkspaceId(ws.id);
          
        },
        error: (error) => {
          console.error('Error loading boards:', error);
          this.isLoading = false;
        }
      });
  }

  navigateToBoard(boardId: number) {
    this.router.navigate([`/workspace/${this.workspace?.id}/boards`, boardId]);
  }

  openCreateBoardModal() {
    this.isCreateBoardModalOpen = true;
  }
} 