import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ViewChild } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { Workspace } from 'src/app/responses/ServerResponse';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  
  workspaces: Workspace[] = [];
  selectedWorkspaceId: number | null = null;
  selectedWorkspaceName: string = "";
  isDropdownOpen = false; // Track dropdown visibility
  isCreateWorkspaceModalOpen = false;

  constructor(
    private workspaceService: WorkspaceService,
    private el: ElementRef,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loadWorkspaces();
    this.workspaceService.getWorkspaceId.subscribe(id => {
      this.selectedWorkspaceId = id;
      this.updateSelectedWorkspaceName();
    });
  }

  loadWorkspaces() {
    this.workspaceService.getAllWorkspaces(); // Call to load workspaces
    this.workspaceService.getWorkspaceObserver.subscribe(workspaces => {
      this.workspaces = workspaces;
      this.updateSelectedWorkspaceName(); // Update the selected workspace name whenever workspaces change
    });
  }

  updateSelectedWorkspaceName() {
    const selectedWorkspace = this.workspaces.find(w => w.id === this.selectedWorkspaceId);
    this.selectedWorkspaceName = selectedWorkspace ? selectedWorkspace.name : 'Select Workspace';
  }

  openCreateBoardModal() {
    this.isCreateWorkspaceModalOpen = true;
  }

  closeCreateBoardModal() {
    this.isCreateWorkspaceModalOpen = false;
  }

  onWorkspaceChange(workspaceId: number) {
    this.selectedWorkspaceId = workspaceId;
    this.workspaceService.setWorkspaceId(workspaceId); // Set the workspace ID in the service
    this.isDropdownOpen = false; // Close dropdown on selection
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle dropdown visibility
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // If click is outside the dropdown
    if (!this.el.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  onBoardCreated() {
    // Refresh the sidebar component
    this.sidebar?.loadBoards(); // Use optional chaining to safely call loadBoards
  }
} 