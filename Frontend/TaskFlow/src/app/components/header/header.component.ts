import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  
  isCreateBoardModalOpen = false;

  openCreateBoardModal() {
    this.isCreateBoardModalOpen = true;
  }

  closeCreateBoardModal() {
    this.isCreateBoardModalOpen = false;
  }

  onBoardCreated() {
    // Find and refresh the sidebar component
    const sidebarComponent = document.querySelector('app-sidebar');
    if (sidebarComponent) {
      (sidebarComponent as any)['__ngContext__'].component.loadBoards();
    }
  }

  // Add any header-related functionality here
} 