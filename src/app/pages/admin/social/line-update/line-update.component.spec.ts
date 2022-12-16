import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineUpdateComponent } from './line-update.component';

describe('LineUpdateComponent', () => {
  let component: LineUpdateComponent;
  let fixture: ComponentFixture<LineUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
