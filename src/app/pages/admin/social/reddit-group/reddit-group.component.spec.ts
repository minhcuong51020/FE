import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedditGroupComponent } from './reddit-group.component';

describe('RedditGroupComponent', () => {
  let component: RedditGroupComponent;
  let fixture: ComponentFixture<RedditGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedditGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedditGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
