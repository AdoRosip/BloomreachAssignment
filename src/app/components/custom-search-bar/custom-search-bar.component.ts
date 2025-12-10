import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-custom-search-bar',
  templateUrl: './custom-search-bar.component.html',
  styleUrls: ['./custom-search-bar.component.scss']
})
export class CustomSearchBarComponent {
  @Input() items: any[] = [];
  @Input() placeholder: string = 'Search...';
  @Input() displayKey: string = 'name'; // which property to display

  @Output() itemSelected = new EventEmitter<any>();

  searchTerm: string = '';
  isOpen: boolean = false;

  get filteredItems() {
    if (!this.searchTerm) return this.items;
    return this.items.filter(item =>
      item[this.displayKey]?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  public onSearch(term: string) {
    this.searchTerm = term;
  }

  public selectItem(item: any) {
    this.itemSelected.emit(item);
    this.isOpen = false;
    this.searchTerm = '';
  }

  public filterResultsBasedOnInput(){
    //REGEX maybe for this... TBC
  }
}
