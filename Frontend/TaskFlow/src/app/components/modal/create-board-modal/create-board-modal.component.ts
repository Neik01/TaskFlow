import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardService } from 'src/app/services/board.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-create-board-modal',
  templateUrl: './create-board-modal.component.html'
})
export class CreateBoardModalComponent implements OnInit{
  @Output() close = new EventEmitter<void>();
  @Output() boardCreated = new EventEmitter<void>();
  
  boardForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private boardService: BoardService,
    private ws: WorkspaceService
  ) {
    this.boardForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      wsId:['']
    });
  }

  ngOnInit(): void {
      this.ws.getWorkspaceId.subscribe(workspaceId => {
        console.log(workspaceId);
        this.boardForm.patchValue({wsId: workspaceId})
      })
  }

  onClose() {
    this.close.emit();
  }

  createBoard() {
    
    if (this.boardForm.valid) {
      console.log(this.boardForm.value);
      
      this.boardService.createBoard(this.boardForm.value).subscribe({
        next: () => {
          this.boardCreated.emit();
          this.close.emit();
        },
        error: (error) => {
          console.error('Error creating board:', error);
        }
      });
    }
  }
} 