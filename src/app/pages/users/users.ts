import { Component } from '@angular/core';
import { CrudTableConfig } from '../../models/crud-table-config.model';
import { CrudTable } from '../../shared/components/crud-table/crud-table';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CrudTable],
  templateUrl: './users.html'
})
export class Users {

  /**
   * Page responsibility:
   * - Define title
   * - Define API resource
   * - Define field behavior (Excel-like)
   *
   * NO data fetching
   * NO CRUD logic
   */
  tableConfig: CrudTableConfig = {
    title: 'Users Management',
    resource: 'users',

    allowCreate: false,
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
        searchable: false,
        editable: true
      },
      {
        field: 'role',
        label: 'Role',
        type: 'select',              // ✅ Excel-style dropdown
        searchable: true,
        editable: true,
        options: [
          { label: 'Admin', value: 'ADMIN' },
          { label: 'Staff', value: 'STAFF' },
          { label: 'User', value: 'USER' }
        ]
      },
      {
        field: 'createdAt',
        label: 'Created Date',
        type: 'date',                // ✅ Excel-style date picker
        sortable: true,
        editable: false              // ❗ Usually not editable
      }
    ]
  };
}
