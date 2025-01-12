import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { TaskResponse } from 'src/app/responses/ServerResponse';
import { TaskServiceService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  tasks:TaskResponse[] = [];
  filterPriority:string ='ALL';
  filteredTasks:TaskResponse[] =[];
  constructor(readonly ts:TaskServiceService,
              readonly route: ActivatedRoute
  ){}

  ngOnInit(): void {
    if(this.route.snapshot.params['keyword']){
      console.log(this.route.snapshot.params['keyword']);
      
    }
    else{
      console.log('no params');
      
    }
    
    this.route.paramMap.subscribe(param =>{
      if(param&&param.get("keyword")){
        console.log(param.get("keyword"));
        this.ts.searchTask(param.get("keyword")!).subscribe(response => {
          this.tasks = response;
          this.filteredTasks = response;
        });
      }
      else
        this.tasks =[]
    })
  }

  filterTask(){
   
    if(this.filterPriority!='ALL'){
      this.filteredTasks = this.tasks.filter(t => t.priority ===this.filterPriority);
    }
    else this.filteredTasks = this.tasks;



  }
}
