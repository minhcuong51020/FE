import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterDetailComponent } from './twitter-detail.component';

describe('TwitterDetailComponent', () => {
  let component: TwitterDetailComponent;
  let fixture: ComponentFixture<TwitterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitterDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwitterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
