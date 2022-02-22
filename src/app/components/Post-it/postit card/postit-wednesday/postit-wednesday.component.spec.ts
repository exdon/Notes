import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostitWednesdayComponent } from './postit-wednesday.component';

describe('PostitWednesdayComponent', () => {
  let component: PostitWednesdayComponent;
  let fixture: ComponentFixture<PostitWednesdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostitWednesdayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostitWednesdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
