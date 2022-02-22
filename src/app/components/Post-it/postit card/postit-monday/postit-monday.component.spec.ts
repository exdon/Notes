import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostitMondayComponent } from './postit-monday.component';

describe('PostitMondayComponent', () => {
  let component: PostitMondayComponent;
  let fixture: ComponentFixture<PostitMondayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostitMondayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostitMondayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
