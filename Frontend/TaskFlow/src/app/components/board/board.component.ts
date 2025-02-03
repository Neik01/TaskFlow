import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from 'src/app/services/board.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardResponse, TaskResponse } from 'src/app/responses/ServerResponse';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{
    columns:any[] = new Array(); 
    columnCounter = 3;
    board!:BoardResponse;
    stages:any[] =[];
    newSectionName:string ='';
    isAddStage:boolean = false;
    activeStage: string | null = null;
    @ViewChild('stageInput') stageInput!: ElementRef;
    selectedTask: TaskResponse | null = null;
    editingStageId: number | null = null;
    activeStageMenu: number | null = null;
    @ViewChild('stageNameInput') stageNameInput!: ElementRef;

  
    constructor(private route: ActivatedRoute, 
      private boardService: BoardService,
      private ts:TaskServiceService) { }
  
    ngOnInit() {
  
        this.boardService.getBoardById(this.route.snapshot.params['id']).subscribe((data:BoardResponse) => {
          this.handleBoardResponse(data);
          
        });
    }
   
   handleBoardResponse(data: BoardResponse) {
      this.board = data;
      // Sort stages by position
      this.stages = this.board.stages.sort((stage1, stage2) => stage1.position - stage2.position) || [];
      
      // Sort tasks within each stage
      this.stages.forEach(stage => {
        stage.tasks = this.board.tasks
          .filter(task => task.stage?.id === stage.id)
          .sort((a, b) => a.positionInStage - b.positionInStage);
      });
    }
  
    // Add a new task to a specific column
    addTask(stage: any) {
      this.activeStage = stage.id;
    }
  
    toggleAddStage() {
      this.isAddStage = !this.isAddStage;
      if (this.isAddStage) {
        setTimeout(() => {
          this.stageInput.nativeElement.focus();
        });
      } else {
        this.newSectionName = '';
      }
    }
  
    addStage() {
      if (this.newSectionName.trim()) {
        this.boardService.createStage(this.board.id, this.newSectionName).subscribe((data: BoardResponse) => {
          this.handleBoardResponse(data);
          this.newSectionName = '';
          this.isAddStage = false;
        });
      }
    }
  
    cancelAddStage(){
      this.isAddStage = false;
      this.newSectionName = '';
    }
  
    dropStage(event: CdkDragDrop<any[]>) {
      moveItemInArray(this.stages, event.previousIndex, event.currentIndex);
      console.log(this.stages);
      const stagesId = this.stages.reduce((acc: { [key: number]: number }, stage, index) => ({
        ...acc,
        [stage.id]: index
      }), {});
      console.log(stagesId);
      this.boardService.updateStages(stagesId).subscribe((data:BoardResponse[]) => {
        console.log(data);
      })
    }
  
    // Handle reordering of tasks within and across columns
    dropTask(event: CdkDragDrop<any[]>) {
      if (event.previousContainer === event.container) {
        // Reorder tasks within the same column
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
  
      } else {
        // Move tasks between columns
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex==0 ? 0 : event.currentIndex
        );
      }
  
      const previousStageId = +(event.previousContainer.element.nativeElement.parentElement?.getAttribute('id') ?? -1);
      const currentStageId = +(event.container.element.nativeElement.parentElement?.getAttribute('id')??-1);
     
      const sourcePositionMap: { [key: string]: number | string } = {};
    
      event.previousContainer.data.forEach((task: any, index: number) => {
        sourcePositionMap[task.id] = index;
      });
  
      const targetPositionMap: { [key: string]: number | string } = {};
     
      event.container.data.forEach((task: any, index: number) => {
        targetPositionMap[task.id] = index;
      });
      
      // Send both position maps to backend
      this.ts.updateTaskPos(
        targetPositionMap,
        sourcePositionMap,
        previousStageId,
        currentStageId
      ).subscribe(response => {
        console.log(response);
      });
    }
  
    toggleTaskModal(stage: any) {
      this.activeStage = this.activeStage === stage.id ? null : stage.id;
    }
    
    closeTaskModal() {
      this.activeStage = null;
      // Refresh the project data after task creation
      this.boardService.getBoardById(this.board.id).subscribe((data:BoardResponse) => {
        this.handleBoardResponse(data);
      });
    }
  
    openTaskDetail(task: TaskResponse) {
      this.selectedTask = task;
    }
  
    closeTaskDetail() {
      this.selectedTask = null;
    }
  
    onTaskUpdated() {
      this.closeTaskDetail();
      // Refresh your task list
      this.boardService.getBoardById(this.board.id).subscribe((data:BoardResponse) => {
            this.handleBoardResponse(data);
      });
    }

    loadBoard() {
      this.boardService.getBoardById(this.route.snapshot.params['id']).subscribe((data: BoardResponse) => {
        this.handleBoardResponse(data);
      });
    }

    // Toggle stage menu dropdown
    toggleStageMenu(event: Event, stageId: number) {
      event.stopPropagation(); // Prevent event bubbling
      this.activeStageMenu = this.activeStageMenu === stageId ? null : stageId;
    }

    // Start editing stage name
    startEditingStage(event: Event, stage: any) {
      event.stopPropagation(); // Prevent event bubbling
      this.editingStageId = stage.id;
      this.activeStageMenu = null;
      setTimeout(() => {
        this.stageNameInput?.nativeElement.focus();
      });
    }

    // Update stage name
    updateStageName(stage: any) {
      if (stage.name.trim()) {
        this.boardService.updateStage(stage.id, stage.name).subscribe({
          next: (data: BoardResponse) => {
            this.handleBoardResponse(data);
            this.editingStageId = null;
          },
          error: (error) => {
            console.error('Error updating stage:', error);
          }
        });
      }
    }

    // Delete stage
    deleteStage(event: Event, stage: any) {
      event.stopPropagation(); // Prevent event bubbling
      if (confirm('Are you sure you want to delete this stage? All tasks in this stage will be moved to the first stage.')) {
        // Immediately remove stage from local list
        const stageIndex = this.stages.findIndex(s => s.id === stage.id);
        if (stageIndex > -1) {
          this.stages.splice(stageIndex, 1);
        }
        
        this.boardService.deleteStage(stage.id).subscribe({
          next: (response: BoardResponse) => {
            if (response) {
              this.handleBoardResponse(response);
            }
            this.activeStageMenu = null;
          },
          error: (error) => {
            console.error('Error deleting stage:', error);
            // Revert the local deletion on error
            if (stageIndex > -1) {
              this.stages.splice(stageIndex, 0, stage);
            }
            alert('Failed to delete stage. Please try again.');
          }
        });
      }
    }

    // Close menu when clicking outside
    @HostListener('document:click', ['$event'])
    closeMenuOnClickOutside(event: Event) {
      if (this.activeStageMenu !== null && !(event.target as Element).closest('.stage-menu')) {
        this.activeStageMenu = null;
      }
    }

    getDropdownPosition(buttonElement: HTMLElement) {
      if (buttonElement) {
        const rect = buttonElement.getBoundingClientRect();
        return {
          top: rect.bottom + 8 + 'px',  // 8px gap
          left: (rect.right - 120) + 'px' // menu width is 120px
        };
      }
      return { top: '0px', left: '0px' };
    }
}
