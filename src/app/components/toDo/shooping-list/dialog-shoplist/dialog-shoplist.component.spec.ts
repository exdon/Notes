import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShoplistComponent } from './dialog-shoplist.component';

describe('DialogShoplistComponent', () => {
  let component: DialogShoplistComponent;
  let fixture: ComponentFixture<DialogShoplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogShoplistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShoplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
