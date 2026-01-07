export type CrudFieldType = 'text' | 'number' | 'date' | 'select' | 'boolean';

export interface CrudColumn {
  field: string;
  label: string;
  type: CrudFieldType;

  searchable?: boolean;
  sortable?: boolean;
  editable?: boolean;

  // for select
  options?: { label: string; value: any }[];
}

export interface CrudTableConfig {
  title: string;
  resource: string;

  allowCreate?: boolean;
  allowEdit?: boolean;
  allowDelete?: boolean;

  columns: CrudColumn[];
}
