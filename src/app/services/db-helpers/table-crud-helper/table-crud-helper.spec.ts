import { TestBed } from '@angular/core/testing';

import { TableCrudHelper } from './table-crud-helper';

describe('TableCrudHelper', () => {
  let service: TableCrudHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableCrudHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
