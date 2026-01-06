import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SearchFilter {
  searchText: string;
  dateFrom: string;
  dateTo: string;
  column?: string;
}

@Component({
  selector: 'app-table-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col gap-4">
      <!-- Search Row -->
      <div class="flex items-end gap-4 flex-wrap">
        <!-- Search Text Input -->
        <div class="flex-1 min-w-48 flex flex-col gap-1">
          <label class="text-sm font-medium text-slate-700">Search:</label>
          <input 
            type="text" 
            [(ngModel)]="searchTerm"
            (ngModelChange)="onSearchChange()"
            placeholder="Search records..."
            class="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent">
        </div>

        <!-- Date From -->
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-slate-700">From:</label>
          <input 
            type="date" 
            [(ngModel)]="dateFrom"
            class="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent">
        </div>

        <!-- Date To -->
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-slate-700">To:</label>
          <input 
            type="date" 
            [(ngModel)]="dateTo"
            class="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent">
        </div>

        <!-- Search Button -->
        <button 
          (click)="onApplyFilter()"
          class="px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center border gap-2 whitespace-nowrap">
          Search
        </button>

        <!-- Clear Button -->
        <button 
          *ngIf="searchTerm || dateFrom || dateTo"
          (click)="onClearAll()"
          class="px-4 py-2 bg-red-400 text-white font-medium rounded-lg hover:bg-red-500 transition-colors whitespace-nowrap">
          Clear
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class TableSearchComponent {
  @Input() tableId: string = '';
  @Input() sortColumn: string = '';
  @Output() search = new EventEmitter<SearchFilter>();
  @Output() clear = new EventEmitter<void>();

  searchTerm: string = '';
  dateFrom: string = '';
  dateTo: string = '';

  onSearchChange(): void {
    // Optional: live search as user types (if desired)
    // For now, we'll wait for the Search button click
  }

  onApplyFilter(): void {
    // Validate date range
    if (this.dateFrom && this.dateTo && this.dateFrom > this.dateTo) {
      console.warn('Date From cannot be after Date To');
      return;
    }

    const filter: SearchFilter = {
      searchText: this.searchTerm,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      column: this.sortColumn
    };

    this.search.emit(filter);
  }

  onClearAll(): void {
    this.searchTerm = '';
    this.dateFrom = '';
    this.dateTo = '';
    this.clear.emit();
  }
}
