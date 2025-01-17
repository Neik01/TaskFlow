import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProjectResponse } from '../responses/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projecturl = environment.apiUrl+'/projects'
 
 
   constructor(public httpClient:HttpClient) { }
 

  public getAllProject(){
    return this.httpClient.get<ProjectResponse[]>(this.projecturl);
  }

  public createProject(formValue:any){
    console.log(formValue);
    return this.httpClient.post<ProjectResponse>(this.projecturl,formValue);
  }

  public getProjectById(id:number){
    return this.httpClient.get<ProjectResponse>(this.projecturl+"/"+id);
  }

  public createStage(projectId:number,stageName:string){
    return this.httpClient.post<ProjectResponse>(this.projecturl+"/createStage",{name:stageName,projectId:projectId});
  }

  public updateStages(stages:any){
    return this.httpClient.put<ProjectResponse[]>(this.projecturl+"/updateStage",{stages:stages});
  }
}
