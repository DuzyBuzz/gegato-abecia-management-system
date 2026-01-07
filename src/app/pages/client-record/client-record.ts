import { Component, OnInit, ViewContainerRef, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableFilterService, TableState } from '../../services/table-filter.service';
import { ColumnHeaderDirective, ColumnFilterEvent } from '../../directives/column-header.directive';
import { FilterMenuComponent } from '../../shared/filter-menu/filter-menu.component';
import { TableSearchComponent, SearchFilter } from '../../shared/table-search/table-search.component';
import { Observable } from 'rxjs';
import { AlertComponent } from "../../shared/components/alert/alert.component";

interface Record {
  id: number;
  caseNo: string;
  deceasedName: string;
  familyContact: string;
  phone: string;
  address: string;
  dateOfDeath: string;
  status: string;
}

@Component({
  selector: 'app-client-record',
imports: [CommonModule, RouterModule, RouterLink, ColumnHeaderDirective, FilterMenuComponent, TableSearchComponent, FormsModule, AlertComponent],
  templateUrl: './client-record.html',
  styleUrl: './client-record.scss',
})
export class ClientRecord implements OnInit {
  readonly tableId = 'records-table';






// This is the only method needed to open the modal from parent



  showContractModal = false;

  openModal() {
    this.showContractModal = true;
  }


  closeModal() {
    this.showContractModal = false;
  }
  originalRecords: Record[] = [
    { 
      id: 1, 
      caseNo: 'GA-2025-001',
      deceasedName: 'James Mitchell', 
      familyContact: 'Sarah Mitchell',
      phone: '555-0101',
      address: '123 Oak Street, Springfield',
      dateOfDeath: '2025-01-15',
      status: 'Active'
    },
    { 
      id: 2, 
      caseNo: 'GA-2025-002',
      deceasedName: 'Margaret Johnson', 
      familyContact: 'David Johnson',
      phone: '555-0102',
      address: '456 Elm Avenue, Springfield',
      dateOfDeath: '2025-01-18',
      status: 'Active'
    },
    { 
      id: 3, 
      caseNo: 'GA-2025-003',
      deceasedName: 'Robert Williams', 
      familyContact: 'Linda Williams',
      phone: '555-0103',
      address: '789 Maple Drive, Springfield',
      dateOfDeath: '2025-01-20',
      status: 'Completed'
    },
    { 
      id: 4, 
      caseNo: 'GA-2025-004',
      deceasedName: 'Patricia Brown', 
      familyContact: 'Michael Brown',
      phone: '555-0104',
      address: '321 Pine Road, Springfield',
      dateOfDeath: '2025-01-22',
      status: 'Active'
    }
  ];

  tableState$: Observable<TableState<Record>>;
  filterMenu: { isOpen: boolean; column: string; position: { top: number; left: number } } = {
    isOpen: false,
    column: '',
    position: { top: 0, left: 0 }
  };
  editingId: number | null = null;
  editingRecord: Partial<Record> = {};

  constructor(
    private filterService: TableFilterService,
    private viewContainerRef: ViewContainerRef,
    private router: Router
  ) {
    this.tableState$ = this.filterService.initializeTable(this.tableId, this.originalRecords);
  }

  openBillingEntry(): void {

      this.router.navigate(['/user/entry-forms/billing-entry'], {
  });
}
  openEditContract(): void {

      this.router.navigate(['/user/entry-forms/funeral-service-contract'], {
  });
}

  ngOnInit(): void {
  }

  onColumnFilter(event: ColumnFilterEvent): void {
    this.filterMenu = {
      isOpen: true,
      column: event.column,
      position: event.position
    };
  }

  closeFilterMenu(): void {
    this.filterMenu.isOpen = false;
  }

  getDisplayRecords(state: TableState<Record>): Record[] {
    return state.filteredData;
  }

  startEdit(record: Record): void {
    this.editingId = record.id;
    this.editingRecord = { ...record };
  }

  saveEdit(record: Record): void {
    const index = this.originalRecords.findIndex(r => r.id === record.id);
    if (index !== -1) {
      this.filterService.updateRow(this.tableId, index, { ...record, ...this.editingRecord } as Record);
    }
    this.editingId = null;
    this.editingRecord = {};
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editingRecord = {};
  }

  deleteRecord(record: Record): void {
    const index = this.originalRecords.findIndex(r => r.id === record.id);
    if (index !== -1) {
      this.filterService.deleteRow(this.tableId, index);
    }
  }

  addNewRecord(): void {
    const newId = Math.max(...this.originalRecords.map(r => r.id), 0) + 1;
    const newRecord: Record = {
      id: newId,
      caseNo: `GA-2025-${String(newId).padStart(3, '0')}`,
      deceasedName: '',
      familyContact: '',
      phone: '',
      address: '',
      dateOfDeath: new Date().toISOString().split('T')[0],
      status: 'Active'
    };
    this.filterService.addRow(this.tableId, newRecord);
    this.startEdit(newRecord);
  }

  onSearch(filter: SearchFilter): void {
    // Apply text search
    if (filter.searchText) {
      this.filterService.search(this.tableId, filter.searchText);
    } else {
      this.filterService.clearSearch(this.tableId);
    }
    
    // Apply date range filter
    if (filter.dateFrom || filter.dateTo) {
      this.filterByDateRange(filter.dateFrom, filter.dateTo);
    }
  }

  onClearSearch(): void {
    this.filterService.clearSearch(this.tableId);
  }

  private filterByDateRange(dateFrom: string, dateTo: string): void {
    const filtered = this.originalRecords.filter(record => {
      const recordDate = new Date(record.dateOfDeath);
      
      if (dateFrom && recordDate < new Date(dateFrom)) {
        return false;
      }
      
      if (dateTo && recordDate > new Date(dateTo)) {
        return false;
      }
      
      return true;
    });
    
    // Apply the filtered results to the service
    this.filterService.initializeTable(this.tableId, filtered);
  }
  onPrintSelect(event: Event): void {
  const value = (event.target as HTMLSelectElement).value;

  switch (value) {
    case 'funeral-contract':
      this.router.navigate(['/printing-forms/funeral-service-contract']);
      break;

    case 'cremation-certificate':
      this.router.navigate(['/printing-forms/cremation-certificate']);
      break;

    case 'authority-cremate':
      this.router.navigate(['/printing-forms/authority-to-cremate-remains']);
      break;

    case 'statement-account':
      this.router.navigate(['/printing-forms/statement-of-account']);
      break;

    default:
      return;
  }

  // reset dropdown after navigation (important UX)
  (event.target as HTMLSelectElement).value = '';
}
}
