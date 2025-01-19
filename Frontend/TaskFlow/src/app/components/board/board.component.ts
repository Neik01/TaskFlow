import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
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

  
    constructor(private route: ActivatedRoute, 
      private boardService: BoardService,
      private ts:TaskServiceService) { }
  
    ngOnInit() {
  
        this.boardService.getBoardById(1).subscribe((data:BoardResponse) => {
          this.handleBoardResponse(data);
          
        });
    }
   
   handleBoardResponse(data: BoardResponse) {
      this.board = data;
      this.stages = this.board.stages.sort((stage1,stage2)=>stage1.position - stage2.position) || [];
      if (this.stages.length === 0 || this.stages[0].name !== 'No stage') {
        this.stages.unshift({ id: -1, name: 'No stage', tasks: [] });
      }
      const noStageTasks = this.board.tasks.filter(task => !task.stage);
      this.stages[0].tasks = noStageTasks;
      this.stages.forEach(stage => {
        if (stage.name !== 'No stage') {
          stage.tasks = this.board.tasks.filter(task => task.stage?.id === stage.id)
            .sort((a, b) => a.positionInStage - b.positionInStage);
        }
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
      console.log()
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
}
