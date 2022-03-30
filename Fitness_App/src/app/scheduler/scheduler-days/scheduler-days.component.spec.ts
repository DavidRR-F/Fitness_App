import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerDaysComponent } from './scheduler-days.component';

describe('SchedulerDaysComponent', () => {
  let component: SchedulerDaysComponent;
  let fixture: ComponentFixture<SchedulerDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulerDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
