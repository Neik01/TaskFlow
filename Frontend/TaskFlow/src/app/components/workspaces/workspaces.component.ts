import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service'; // Adjust the import path

@Component({
  selector: 'app-workspaces',
  templateUrl: './workspaces.component.html',
  styleUrls: ['./workspaces.component.css']
})
export class WorkspacesComponent implements OnInit {
  workspaces: any[] = []; // Array to hold workspaces

  constructor(private workspaceService: WorkspaceService) {}

  ngOnInit() {
    this.loadWorkspaces(); // Load workspaces on component initialization
  }

  loadWorkspaces() {
    this.workspaceService.getAllWorkspaces().subscribe(data => {
      this.workspaces = data; // Assign fetched workspaces to the component property
    });
  }
}
