import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface FilterCriteria {
  column: string;
  values: any[];
}

export interface TableState<T> {
  data: T[];
  filteredData: T[];
  filters: FilterCriteria[];
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
  searchTerm: string;
}

@Injectable({
  providedIn: 'root'
})
export class TableFilterService {
  private tableStates = new Map<string, BehaviorSubject<TableState<any>>>();

  constructor() {}

  initializeTable<T>(tableId: string, data: T[]): Observable<TableState<T>> {
    const initialState: TableState<T> = {
      data: [...data],
      filteredData: [...data],
      filters: [],
      sortBy: null,
      sortOrder: 'asc',
      searchTerm: ''
    };

    if (!this.tableStates.has(tableId)) {
      this.tableStates.set(tableId, new BehaviorSubject(initialState));
    }
    return this.tableStates.get(tableId)!.asObservable();
  }

  getState<T>(tableId: string): TableState<T> | null {
    const subject = this.tableStates.get(tableId);
    return subject ? subject.value : null;
  }

  applyFilter<T>(tableId: string, column: string, values: any[]): void {
    const state = this.getState<T>(tableId);
    if (!state) return;

    // Remove existing filter for this column
    state.filters = state.filters.filter(f => f.column !== column);

    // Add new filter if values provided
    if (values.length > 0) {
      state.filters.push({ column, values });
    }

    this.applyFiltersAndSort(tableId, state);
  }

  clearFilters<T>(tableId: string): void {
    const state = this.getState<T>(tableId);
    if (!state) return;

    state.filters = [];
    state.filteredData = [...state.data];
    this.updateState(tableId, state);
  }

  sort<T>(tableId: string, column: string): void {
    const state = this.getState<T>(tableId);
    if (!state) return;

    if (state.sortBy === column) {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      state.sortBy = column;
      state.sortOrder = 'asc';
    }

    this.applyFiltersAndSort(tableId, state);
  }

  private applyFiltersAndSort<T>(tableId: string, state: TableState<T>): void {
    let result = [...state.data];

    // Apply search
    if (state.searchTerm.trim()) {
      const searchLower = state.searchTerm.toLowerCase();
      result = result.filter(item => {
        return Object.values(item as Record<string, any>).some(value => 
          String(value).toLowerCase().includes(searchLower)
        );
      });
    }

    // Apply filters
    state.filters.forEach(filter => {
      result = result.filter(item => {
        const value = this.getNestedValue(item, filter.column);
        return filter.values.includes(value);
      });
    });

    // Apply sorting
    if (state.sortBy) {
      result.sort((a, b) => {
        const aVal = this.getNestedValue(a, state.sortBy!);
        const bVal = this.getNestedValue(b, state.sortBy!);

        if (aVal < bVal) return state.sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return state.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    state.filteredData = result;
    this.updateState(tableId, state);
  }

  getDistinctValues<T>(tableId: string, column: string): any[] {
    const state = this.getState<T>(tableId);
    if (!state) return [];

    const values = state.data
      .map(item => this.getNestedValue(item, column))
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();

    return values;
  }

  getActiveFilters<T>(tableId: string, column: string): any[] {
    const state = this.getState<T>(tableId);
    if (!state) return [];

    const filter = state.filters.find(f => f.column === column);
    return filter ? filter.values : [];
  }

  // CRUD Operations
  addRow<T>(tableId: string, newRow: T): void {
    const state = this.getState<T>(tableId);
    if (!state) return;

    state.data.push(newRow);
    this.applyFiltersAndSort(tableId, state);
  }

  updateRow<T>(tableId: string, index: number, updatedRow: T): void {
    const state = this.getState<T>(tableId);
    if (!state || index < 0 || index >= state.data.length) return;

    state.data[index] = updatedRow;
    this.applyFiltersAndSort(tableId, state);
  }

  deleteRow<T>(tableId: string, index: number): void {
    const state = this.getState<T>(tableId);
    if (!state || index < 0 || index >= state.data.length) return;

    state.data.splice(index, 1);
    this.applyFiltersAndSort(tableId, state);
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }

  private updateState<T>(tableId: string, state: TableState<T>): void {
    const subject = this.tableStates.get(tableId);
    if (subject) {
      subject.next(state);
    }
  }

  search<T>(tableId: string, searchTerm: string): void {
    const state = this.getState<T>(tableId);
    if (!state) return;

    state.searchTerm = searchTerm;
    this.applyFiltersAndSort(tableId, state);
  }

  clearSearch<T>(tableId: string): void {
    const state = this.getState<T>(tableId);
    if (!state) return;

    state.searchTerm = '';
    this.applyFiltersAndSort(tableId, state);
  }
}
