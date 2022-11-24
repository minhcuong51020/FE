import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedditGroupUpdateComponent } from './reddit-group-update.component';

describe('RedditGroupUpdateComponent', () => {
  let component: RedditGroupUpdateComponent;
  let fixture: ComponentFixture<RedditGroupUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedditGroupUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedditGroupUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
