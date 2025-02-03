import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-create-board-modal',
  templateUrl: './create-board-modal.component.html'
})
export class CreateBoardModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() boardCreated = new EventEmitter<void>();
  
  boardForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private boardService: BoardService
  ) {
    this.boardForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  onClose() {
    this.close.emit();
  }

  createBoard() {
    if (this.boardForm.valid) {
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