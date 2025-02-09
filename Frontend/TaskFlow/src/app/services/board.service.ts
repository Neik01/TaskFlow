import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BoardResponse } from '../responses/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
    boardUrl = environment.apiUrl+'/boards'
 
 
    constructor(public httpClient:HttpClient) { }
  
 
   public getAllBoard(){
     return this.httpClient.get<BoardResponse[]>(this.boardUrl);
   }
 
   public createBoard(formValue: {name: string, description: string}) {
     return this.httpClient.post<BoardResponse>(this.boardUrl, formValue);
   }
 
   public getBoardById(id:number){
     return this.httpClient.get<BoardResponse>(this.boardUrl+"/"+id);
   }
 
   public createStage(boardId:number,columnName:string){
     return this.httpClient.post<BoardResponse>(this.boardUrl+"/createStage",{name:columnName,boardId:boardId});
   }
 
   public updateStages(columns:any){
     return this.httpClient.put<BoardResponse[]>(this.boardUrl+"/updateStage",{columns:columns});
   }

   // Update stage
   public updateStage(stageId: number, name: string) {
     return this.httpClient.put<BoardResponse>(`${this.boardUrl}/stages/${stageId}`, { name });
   }

   // Delete stage
   public deleteStage(stageId: number) {
     return this.httpClient.delete<BoardResponse>(`${this.boardUrl}/stages/${stageId}`);
   }
}
