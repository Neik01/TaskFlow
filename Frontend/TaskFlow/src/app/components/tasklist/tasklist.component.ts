import { Component, OnInit } from '@angular/core';
import { TaskResponse } from 'src/app/responses/TaskResponse';
import { TaskServiceService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit{

  tasks:TaskResponse[] = [];
  filterStatus:string ='ALL';
  filterPriority:string ='ALL';
  filteredTasks:TaskResponse[] =[];
  constructor(readonly ts:TaskServiceService){}

  ngOnInit(): void {
    this.ts.getAllTask().subscribe(response => {
      this.tasks = response;
      this.filteredTasks = response;
    })

  }

  filterTask(){
   
    if(this.filterPriority!='ALL'){
      this.filteredTasks = this.tasks.filter(t => t.priority ===this.filterPriority);
    }
    else this.filteredTasks = this.tasks;

    if(this.filterStatus!='ALL'){
      this.filteredTasks = this.tasks.filter(t => t.status ===this.filterStatus);
    }
    else this.filteredTasks = this.tasks;

  }
}
