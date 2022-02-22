import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostitFridayComponent } from './postit-friday.component';

describe('PostitFridayComponent', () => {
  let component: PostitFridayComponent;
  let fixture: ComponentFixture<PostitFridayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostitFridayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostitFridayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
