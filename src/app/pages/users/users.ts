import { Component } from '@angular/core';
import { CrudTableConfig } from '../../models/crud-table-config.model';
import { CrudTableComponent } from '../../shared/components/crud-table/crud-table';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CrudTableComponent],
  templateUrl: './users.html'
})
export class Users {

  /**
   * This page ONLY defines metadata.
   * Data loading is handled by CrudTableComponent.
   */
  tableConfig: CrudTableConfig = {
    title: 'Users Management',
    resource: 'users',

    allowCreate: true,
    allowEdit: true,
    allowDelete: false,

    columns: [
      {
        field: 'name',
        label: 'Name',
        type: 'text',
        searchable: true,
        sortable: true,
        editable: true
      },
      {
        field: 'email',
        label: 'Email',
        type: 'text',
        searchable: true,
        editable: true
      },
      {
        field: 'role',
        label: 'Role',
        type: 'text',
        searchable: true,
        editable: true
      },
      {
        field: 'createdAt',
        label: 'Created Date',
        type: 'date',
        sortable: true
      }
    ]
  };
}
