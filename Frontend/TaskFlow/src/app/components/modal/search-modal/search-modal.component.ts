import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent {
  filteredResults =''
  searchKeyword =''
  @Output() close = new EventEmitter<void>();

  constructor(readonly router: Router){}
  onCancel() {
    this.close.emit();
  }

  navigateToTaskSearch(){
    this.router.navigateByUrl("/search/"+this.searchKeyword)
  }
}
