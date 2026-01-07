export interface CrudColumn {
  field: string;           // API field name
  label: string;           // Column header
  type: 'text' | 'number' | 'date';

  searchable?: boolean;
  sortable?: boolean;
  editable?: boolean;
}
