import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostitSundayComponent } from './postit-sunday.component';

describe('PostitSundayComponent', () => {
  let component: PostitSundayComponent;
  let fixture: ComponentFixture<PostitSundayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostitSundayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostitSundayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
