import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementOfAccountEntry } from './statement-of-account-entry';

describe('StatementOfAccountEntry', () => {
  let component: StatementOfAccountEntry;
  let fixture: ComponentFixture<StatementOfAccountEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementOfAccountEntry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatementOfAccountEntry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
