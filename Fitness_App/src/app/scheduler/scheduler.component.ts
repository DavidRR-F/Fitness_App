import { animate, group, state, style, transition, trigger } from '@angular/animations';
import {
  Component, OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { SchedulerService } from '../services/scheduler.service';
import { Event } from '../shared/models/event.model';


@Component({
  selector: 'app-schedular-component',
  styleUrls: ['./scheduler.component.css'],
  templateUrl: './scheduler.component.html',
  animations: [
    trigger('days', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      state('out', style({
        opacity: 0,
        transform: 'translateY(1000px)'
      })),
      transition('in <=> out', animate(600)),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-1000px)'
        }),
        animate(600)
      ]),
      transition('* => void', [
        group([
          animate(100, 
            style({
              color: 'red'
            })),
          animate(600,
            style({
              opacity: 0,
              transform: 'translateY(1000px)'
            }))
          ])
        ])
    ])
  ]
})
export class SchedulerComponent implements OnInit {
  months: string[] = [
    'January', 'Febuary', 'March', 'April', 'May','June', 'July', 
    'August', 'September', 'October','November', 'December'
  ];
  week: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wendsday', 'Thursday', 'Friday', 'Saturday'];
  date = new Date();
  month = new Date().getMonth();
  days: Date[];
  state = 'in';

  constructor(
    private schedulerService: SchedulerService
  ) {
  }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(){
    this.days = [];
    this.days = this.schedulerService.getDaysInMonth(this.month);
    this.state = "in";
  }

  getNextMonth(){
    this.state = "out";
    this.month = this.month + 1;
    this.getInfo();
  }

  getPreviousMonth(){
    this.month = this.month - 1;
    this.getInfo();
  }

  getMonth(){
    return this.months[this.month] + " " + this.date.getFullYear();
  }

  getInMonth(day: Date){
    return day.getMonth() === this.month;
  }

  eventSub(day: Date){
    return this.schedulerService.onSchedulerSub(day);
  }
}
