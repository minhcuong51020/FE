import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterUpdateComponent } from './twitter-update.component';

describe('TwitterUpdateComponent', () => {
  let component: TwitterUpdateComponent;
  let fixture: ComponentFixture<TwitterUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitterUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwitterUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
