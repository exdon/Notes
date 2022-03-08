import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFinancialComponent } from './dialog-financial.component';

describe('DialogFinancialComponent', () => {
  let component: DialogFinancialComponent;
  let fixture: ComponentFixture<DialogFinancialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFinancialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
