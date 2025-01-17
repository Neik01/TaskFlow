import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TaskResponse } from '../responses/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  taskUrl = environment.apiUrl+'/tasks'


  constructor(public httpClient:HttpClient) { }


  public getAllTask(){
    return this.httpClient.get<TaskResponse[]>(this.taskUrl);
  }

  public createTask(formValue:any){
    console.log(formValue);
    return this.httpClient.post<TaskResponse>(this.taskUrl,formValue);
  }


  public searchTask(keyword:string){
    return this.httpClient.get<TaskResponse[]>(this.taskUrl+"/search/"+keyword);
  }

  public updateTaskPosInStage(tasks:any){
    return this.httpClient.put<TaskResponse[]>(this.taskUrl+"/updatePosInStage",tasks);

  }

  public changeTaskStage(taskId:number,stageId:number){

    return this.httpClient.put<TaskResponse>(this.taskUrl+"/changeStage",{taskId:taskId,stageId:stageId});
  }

  public updateTaskPos(currentStage:any,previousStage:any,prevStageId:number,currentStageId:number){
    return this.httpClient.put<TaskResponse[]>(this.taskUrl+"/changePos",{currentStage:currentStage,prevStage:previousStage,prevStageId:prevStageId,currentStageId:currentStageId});

  }
}
