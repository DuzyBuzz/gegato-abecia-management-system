import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilterService } from '../../services/table-filter.service';

@Component({
  selector: 'app-filter-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="absolute bg-white rounded-lg shadow-xl border border-slate-200 z-50 min-w-max" 
         [style.top.px]="position.top" 
         [style.left.px]="position.left">
      <div class="p-4 border-b border-slate-200">
        <h4 class="text-sm font-semibold text-slate-900">Filter by {{ column }}</h4>
      </div>
      
      <div class="max-h-60 overflow-y-auto">
        <div class="p-2">
          <!-- Select All / Clear All -->
          <label class="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 cursor-pointer rounded">
            <input type="checkbox" 
                   [checked]="selectedValues.length === distinctValues.length && distinctValues.length > 0"
                   [indeterminate]="selectedValues.length > 0 && selectedValues.length < distinctValues.length"
                   (change)="toggleSelectAll($event)"
                   class="rounded">
            <span class="text-sm font-medium text-slate-900">{{ selectedValues.length === distinctValues.length && distinctValues.length > 0 ? 'Deselect All' : 'Select All' }}</span>
          </label>
          
          <!-- Individual Values -->
          <div *ngFor="let value of distinctValues" class="border-t border-slate-100">
            <label class="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 cursor-pointer">
              <input type="checkbox" 
                     [checked]="selectedValues.includes(value)"
                     (change)="toggleValue(value)"
                     class="rounded">
              <span class="text-sm text-slate-700">{{ value }}</span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="border-t border-slate-200 p-3 flex gap-2">
        <button (click)="clearFilter()" 
                class="flex-1 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors">
          Clear
        </button>
        <button (click)="applyFilter()" 
                class="flex-1 px-3 py-2 text-sm font-medium text-white bg-slate-700 hover:bg-slate-800 rounded transition-colors">
          Apply
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      position: fixed;
      top: 0;
      left: 0;
    }
  `]
})
export class FilterMenuComponent {
  @Input() column: string = '';
  @Input() position: { top: number; left: number } = { top: 0, left: 0 };
  @Input() tableId: string = '';
  @Output() onClose = new EventEmitter<void>();

  distinctValues: any[] = [];
  selectedValues: any[] = [];

  constructor(private filterService: TableFilterService, private el: ElementRef) {}

  ngOnInit(): void {
    this.distinctValues = this.filterService.getDistinctValues(this.tableId, this.column);
    this.selectedValues = [...this.filterService.getActiveFilters(this.tableId, this.column)];
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.onClose.emit();
    }
  }

  toggleValue(value: any): void {
    const index = this.selectedValues.indexOf(value);
    if (index > -1) {
      this.selectedValues.splice(index, 1);
    } else {
      this.selectedValues.push(value);
    }
  }

  toggleSelectAll(event: any): void {
    if (event.target.checked) {
      this.selectedValues = [...this.distinctValues];
    } else {
      this.selectedValues = [];
    }
  }

  applyFilter(): void {
    this.filterService.applyFilter(this.tableId, this.column, this.selectedValues);
    this.onClose.emit();
  }

  clearFilter(): void {
    this.selectedValues = [];
    this.filterService.applyFilter(this.tableId, this.column, []);
    this.onClose.emit();
  }
}
