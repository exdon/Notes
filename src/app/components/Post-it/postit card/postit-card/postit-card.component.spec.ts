import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostitCardComponent } from './postit-card.component';

describe('PostitCardComponent', () => {
  let component: PostitCardComponent;
  let fixture: ComponentFixture<PostitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostitCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
