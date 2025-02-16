import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { Workspace } from 'src/app/responses/ServerResponse';

@Component({
  selector: 'app-create-workspace-modal',
  templateUrl: './create-workspace-modal.component.html',
})
export class CreateWorkspaceModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() workspaceCreated = new EventEmitter<void>();
  
  workspaceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private workspaceService: WorkspaceService
  ) {
    this.workspaceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  onClose() {
    this.close.emit();
  }

  createWorkspace() {
    if (this.workspaceForm.valid) {
      this.workspaceService.createWorkspace(this.workspaceForm.value).subscribe({
        next: () => {
          this.workspaceCreated.emit();
          this.close.emit();
        },
        error: (error) => {
          console.error('Error creating workspace:', error);
        }
      });
    }
  }
} 