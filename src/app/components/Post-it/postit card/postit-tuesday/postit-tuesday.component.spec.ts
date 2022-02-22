import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostitTuesdayComponent } from './postit-tuesday.component';

describe('PostitTuesdayComponent', () => {
  let component: PostitTuesdayComponent;
  let fixture: ComponentFixture<PostitTuesdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostitTuesdayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostitTuesdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
