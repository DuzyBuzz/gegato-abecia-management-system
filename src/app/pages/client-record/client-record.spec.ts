import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRecord } from './client-record';

describe('ClientRecord', () => {
  let component: ClientRecord;
  let fixture: ComponentFixture<ClientRecord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientRecord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientRecord);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
