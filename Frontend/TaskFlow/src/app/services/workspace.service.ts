import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Workspace } from '../responses/ServerResponse'; // Adjust the path as necessary
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  private apiUrl = `${environment.apiUrl}/workspaces`; // Adjust the endpoint as necessary
  private workspaceId: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private http: HttpClient) {}

  // Get all workspaces
  getAllWorkspaces(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(this.apiUrl);
  }

  // Get a specific workspace by ID
  getWorkspaceById(id: number): Observable<Workspace> {
    return this.http.get<Workspace>(`${this.apiUrl}/${id}`);
  }

  // Create a new workspace
  createWorkspace(workspace: Workspace): Observable<Workspace> {
    return this.http.post<Workspace>(this.apiUrl, workspace);
  }

  // Update an existing workspace
  updateWorkspace(workspace: Workspace): Observable<Workspace> {
    return this.http.put<Workspace>(`${this.apiUrl}/${workspace.id}`, workspace);
  }

  // Delete a workspace
  deleteWorkspace(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

 
  setWorkspaceId(id: number) {
    this.workspaceId.next(id)
  }

  get getWorkspaceId() {
    return this.workspaceId.asObservable();
  }
} 