import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ViewChild } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { Workspace } from 'src/app/responses/ServerResponse';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  
  workspaces: Workspace[] = [];
  selectedWorkspaceId: number | null = null;
  isCreateBoardModalOpen = false;
  isDropdownOpen = false; // Track dropdown visibility

  constructor(private workspaceService: WorkspaceService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.loadWorkspaces();
  }

  loadWorkspaces() {
    this.workspaceService.getAllWorkspaces().subscribe({
      next: (workspaces) => {
        this.workspaces = workspaces;
      },
      error: (error) => {
        console.error('Error loading workspaces:', error);
      }
    });
  }

  openCreateBoardModal() {
    this.isCreateBoardModalOpen = true;
  }

  closeCreateBoardModal() {
    this.isCreateBoardModalOpen = false;
  }

  onWorkspaceChange(workspaceId: number) {
    this.selectedWorkspaceId = workspaceId;
    this.isDropdownOpen = false; // Close dropdown on selection
    // Handle workspace change logic here
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

  getSelectedWorkspaceName(): string {
    const selectedWorkspace = this.workspaces.find(w => w.id === this.selectedWorkspaceId);
    return selectedWorkspace ? selectedWorkspace.name : 'Select Workspace';
  }

  // Add any header-related functionality here
} 