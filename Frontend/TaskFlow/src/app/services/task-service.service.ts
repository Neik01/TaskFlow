import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TaskResponse } from '../responses/TaskResponse';

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
}
