import { TestBed } from '@angular/core/testing';

import { AutocompleteHelper } from './autocomplete-helper';

describe('AutocompleteHelper', () => {
  let service: AutocompleteHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutocompleteHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
