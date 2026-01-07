import { CrudColumn } from './crud-column.model';

export interface CrudTableConfig {
  title: string;
  resource: string;   // API resource (ex: users)

  columns: CrudColumn[];

  allowCreate?: boolean;
  allowEdit?: boolean;
  allowDelete?: boolean;
}
