import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent {
  filteredResults =''
  searchQuery =''
  @Output() close = new EventEmitter<void>();

  filterResults(){

  }

  onCancel() {
    this.close.emit();
  }

}
