import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedditUpdateComponent } from './reddit-update.component';

describe('RedditUpdateComponent', () => {
  let component: RedditUpdateComponent;
  let fixture: ComponentFixture<RedditUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedditUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedditUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
