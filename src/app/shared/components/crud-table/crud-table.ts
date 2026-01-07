import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrudTableConfig } from '../../../models/crud-table-config.model';
import { GenericCrudService } from '../../../services/generic-crud/generic-crud.service';

@Component({
  selector: 'app-crud-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-table.html',
})
export class CrudTableComponent implements OnInit {

  @Input({ required: true }) config!: CrudTableConfig;

  data: any[] = [];
  total = 0;

  page = 1;
  pageSize = 10;

  sortField = '';
  sortDir: 'asc' | 'desc' = 'asc';

  filters: Record<string, any> = {};

  constructor(private crud: GenericCrudService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.crud.fetch(this.config.resource, {
      page: this.page,
      pageSize: this.pageSize,
      sortField: this.sortField,
      sortDir: this.sortDir,
      filters: this.filters
    }).subscribe(res => {
      this.data = res.items;
      this.total = res.total;
    });
  }

  search(field: string, value: string) {
    this.filters[field] = value;
    this.page = 1;
    this.load();
  }

  sort(field: string) {
    if (this.sortField === field) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDir = 'asc';
    }
    this.load();
  }
}
