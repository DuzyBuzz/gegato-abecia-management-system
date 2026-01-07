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
export class CrudTable implements OnInit {

  @Input({ required: true }) config!: CrudTableConfig;

  data: any[] = [];
  editingRow: any | null = null;
  newRow: any | null = null;

  constructor(private crud: GenericCrudService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.crud.fetch(this.config.resource, {
      page: 1,
      pageSize: 50
    }).subscribe(res => {
      this.data = res.items;
    });
  }

  startEdit(row: any) {
    this.editingRow = { ...row }; // clone for safety
  }

  saveEdit(row: any) {
    Object.assign(row, this.editingRow);
    this.editingRow = null;

    // later: call PUT API here
  }

  cancelEdit() {
    this.editingRow = null;
  }

  addNew() {
    this.newRow = {};
  }

  saveNew() {
    this.data.unshift(this.newRow);
    this.newRow = null;

    // later: call POST API here
  }

  remove(row: any) {
    this.data = this.data.filter(r => r !== row);

    // later: call DELETE API here
  }

  isEditing(row: any): boolean {
    return this.editingRow && row === this.editingRowOriginal;
  }

  editingRowOriginal: any;

  startEditRow(row: any) {
    this.editingRowOriginal = row;
    this.editingRow = { ...row };
  }
}
