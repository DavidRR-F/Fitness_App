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
})
export class SchedulerComponent implements OnInit {
  months: string[] = [
    'January', 'Febuary', 'March', 'April', 'May','June', 'July', 
    'August', 'September', 'October','November', 'December'
  ];
  week: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wendsday', 'Thursday', 'Friday', 'Saturday'];
  date = new Date();
  month = new Date().getMonth();
  days = [];

  constructor(
    private schedulerService: SchedulerService
  ) {
    this.getInfo();
  }

  ngOnInit(): void {
  }

  getInfo(){
    this.days = this.schedulerService.getDaysInMonth(this.month);
  }

  getNextMonth(){
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
