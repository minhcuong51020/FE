import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendTwitterComponent } from './send-twitter.component';

describe('SendTwitterComponent', () => {
  let component: SendTwitterComponent;
  let fixture: ComponentFixture<SendTwitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendTwitterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendTwitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
