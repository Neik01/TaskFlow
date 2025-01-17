import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProjectResponse } from 'src/app/responses/ServerResponse';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit{

  columns:any[] = new Array(); 
  columnCounter = 3;
  project!:ProjectResponse;
  stages:any[] =[];
  newSectionName:string ='';
  isAddStage:boolean = false;
  activeStage: string | null = null;
  constructor(private route: ActivatedRoute, 
    private projectService: ProjectService,
    private ts:TaskServiceService) { }

  ngOnInit() {

      this.projectService.getProjectById(1).subscribe((data:ProjectResponse) => {
        this.handleProjectResponse(data);
        
      });
  };
 
  private handleProjectResponse(data: ProjectResponse) {
    this.project = data;
    this.stages = this.project.stages.sort((stage1,stage2)=>stage1.position - stage2.position) || [];
    if (this.stages.length === 0 || this.stages[0].name !== 'No stage') {
      this.stages.unshift({ id: -1, name: 'No stage', tasks: [] });
    }
    const noStageTasks = this.project.tasks.filter(task => !task.stage);
    this.stages[0].tasks = noStageTasks;
    this.stages.forEach(stage => {
      if (stage.name !== 'No stage') {
        stage.tasks = this.project.tasks.filter(task => task.stage?.id === stage.id)
          .sort((a, b) => a.positionInStage - b.positionInStage);
      }
    });
  }

  // Add a new task to a specific column
  addTask(stage: any) {
    this.activeStage = stage.id;
  }

  addStage(){

    if(this.isAddStage){
      console.log(this.newSectionName);
      this.isAddStage = false;
      this.projectService.createStage(this.project.id,this.newSectionName).subscribe((data:ProjectResponse) => {
        this.handleProjectResponse(data);
        this.newSectionName='';
      });
    }
    else
    {
      this.isAddStage = true;
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
    this.projectService.updateStages(stagesId).subscribe((data:ProjectResponse[]) => {
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
  }
}


