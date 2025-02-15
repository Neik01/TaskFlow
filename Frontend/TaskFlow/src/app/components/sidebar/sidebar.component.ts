import { Component, ElementRef, HostListener, OnInit, Output, EventEmitter } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { BoardResponse } from 'src/app/responses/ServerResponse';
import { ActivatedRoute } from '@angular/router';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isMenuOpen = false;
  isCreateModalOpen = false;
  isSearchModalOpen = false;
  boards: BoardResponse[] = [];
  isCollapsed = false;
  workspaceId = 0;
  @Output() collapsedChange = new EventEmitter<boolean>();

  mainMenuItems = [
    {
      label: 'Boards',
      icon: 'fas fa-columns text-gray-400',
      route: '/workspace/'
    },
    {
      label: 'Members',
      icon: 'fas fa-users text-gray-400',
      route: '/members'
    },
    {
      label: 'Workspace settings',
      icon: 'fas fa-cog text-gray-400',
      route: '/settings'
    }
  ];

  workspaceViews = [
    {
      label: 'Table',
      icon: 'fas fa-table text-gray-400'
    },
    {
      label: 'Calendar',
      icon: 'fas fa-calendar text-gray-400'
    }
  ];

  constructor(
    private elementRef: ElementRef,
    private boardService: BoardService,
    private route: ActivatedRoute,
    private ws: WorkspaceService
  ) {}

  ngOnInit() {
    this.loadBoards();
    this.ws.getWorkspaceId.subscribe(id => this.workspaceId = id)
  }

  loadBoards() {
    this.boardService.getAllBoard().subscribe({
      next: (boards) => {
        this.boards = boards;
      },
      error: (error) => {
        console.error('Error loading boards:', error);
      }
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement) {
    // Close the menu if the clicked target is outside the component
    if (!this.elementRef.nativeElement.contains(target)) {
      this.isMenuOpen = false;
    }
  }

  close(){
    
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  openSearchModal(){
    this.isSearchModalOpen = true;
  }

  closeModal() {
    this.isCreateModalOpen = false;
    this.isSearchModalOpen = false;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }
}
