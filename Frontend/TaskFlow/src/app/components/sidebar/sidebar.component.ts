import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isMenuOpen = false;
  isCreateModalOpen = false;
  isSearchModalOpen = false;

  mainMenuItems = [
    {
      label: 'Boards',
      icon: 'fas fa-columns text-gray-400',
      route: '/boards'
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

  boards = [
    {
      name: 'TaskFlow App Development'
    },
    {
      name: 'TaskFlow App Development 2'
    }
  ];

  constructor(private elementRef: ElementRef){}

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
}
