import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(public httpClient:HttpClient) { }


  public getAllTask(){
    
  }
}
