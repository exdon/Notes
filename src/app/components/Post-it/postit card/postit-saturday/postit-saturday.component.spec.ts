import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostitSaturdayComponent } from './postit-saturday.component';

describe('PostitSaturdayComponent', () => {
  let component: PostitSaturdayComponent;
  let fixture: ComponentFixture<PostitSaturdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostitSaturdayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostitSaturdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
