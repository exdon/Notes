import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostitThursdayComponent } from './postit-thursday.component';

describe('PostitThursdayComponent', () => {
  let component: PostitThursdayComponent;
  let fixture: ComponentFixture<PostitThursdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostitThursdayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostitThursdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
