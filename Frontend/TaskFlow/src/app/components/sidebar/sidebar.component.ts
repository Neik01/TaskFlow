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
