import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerDayComponent } from './scheduler-day.component';

describe('SchedulerDayComponent', () => {
  let component: SchedulerDayComponent;
  let fixture: ComponentFixture<SchedulerDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulerDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
