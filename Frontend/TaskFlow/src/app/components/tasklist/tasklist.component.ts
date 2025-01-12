import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectResponse, TaskResponse } from 'src/app/responses/ServerResponse';
import { ProjectService } from 'src/app/services/project.service';
import { TaskServiceService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit{

  tasks:TaskResponse[] = [];
  filterPriority:string ='ALL';
  filteredTasks:TaskResponse[] =[];
  project:ProjectResponse | null = null;
  constructor(readonly ts:TaskServiceService,
              readonly ps:ProjectService,
              readonly route: ActivatedRoute){}

  ngOnInit(): void {
    this.ps.getProjectById(1).subscribe((res:ProjectResponse) => {
      this.project = res;
    });

    this.route.url.subscribe(value=>{
      if(value.length>0)
        this.getSearchResult(value[0].path);
      else
        this.getAllTasks();
    })
  }

  private getSearchResult(value:string) {
    if (value === 'search') {
      if (this.route.snapshot.params['keyword']) {
        this.ts.searchTask(this.route.snapshot.params['keyword']).subscribe(res => {
          this.filteredTasks = res;
        });
      }
      else {
        this.ts.getAllTask().subscribe(res => this.tasks = res);
      }
    }
  }

  getAllTasks(){
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

  }
}
