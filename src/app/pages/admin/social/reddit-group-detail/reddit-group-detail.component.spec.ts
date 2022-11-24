import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedditGroupDetailComponent } from './reddit-group-detail.component';

describe('RedditGroupDetailComponent', () => {
  let component: RedditGroupDetailComponent;
  let fixture: ComponentFixture<RedditGroupDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedditGroupDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedditGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
