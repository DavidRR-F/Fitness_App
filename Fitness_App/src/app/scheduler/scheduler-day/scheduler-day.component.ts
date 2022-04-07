import { 
  Component, 
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import {
  addHours,
} from 'date-fns';
import { Subject, Subscription, take } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { SchedulerService } from 'src/app/services/scheduler.service';
import { Event } from 'src/app/shared/models/event.model';
import { Meal } from 'src/app/shared/models/meal.model';
import { Workout } from 'src/app/shared/models/workout.model';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  }
};

@Component({
  selector: 'app-scheduler-day',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scheduler-day.component.html',
  styleUrls: ['./scheduler-day.component.css']
})
export class SchedulerDayComponent implements OnInit, OnDestroy {

  filter: string = 'All';
  eventType: string;
  date: Date;
  events: Event[];
  key: Date;
  subscription: Subscription;

  refresh = new Subject<void>();
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.CalendarEvents = this.CalendarEvents.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  CalendarEvents: CalendarEvent[] = [];

  constructor(
    private route: ActivatedRoute,
    private schedulerService: SchedulerService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.CalendarEvents = [];
      this.key = new Date(params['day']);
      this.schedulerService.onSchedulerSub(this.key)
      .pipe(take(1)).subscribe((data) => {
        this.events = data.map(events => {return events;});
        data.forEach((value) => {
          this.addEvent(value.event.name, value.eventHourStart, value.eventHourEnd, value.eventType);
        })
      })
    });
  }

  ngOnDestroy(): void {
    this.schedulerService.onUpdateEvents(this.key, this.events);
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.CalendarEvents = this.CalendarEvents.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.events = this.events.map((iEvent) => {
      if (iEvent.event.name === event.title) {
        return new Event(
          iEvent.event,
          iEvent.eventType,
          newStart.getHours(),
          newEnd.getHours()
        );
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  addEvent(title: string, start: number, end: number, type: string): void {
    this.CalendarEvents = [
      ...this.CalendarEvents,
      {
        title: title,
        start: addHours(this.key, start),
        end: addHours(this.key, end),
        color: type === 'workout' ? colors.red : colors.blue,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.CalendarEvents = this.CalendarEvents.filter((event) => event !== eventToDelete);
    this.events.splice(this.CalendarEvents.indexOf(this.modalData.event), 1)
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    console.log(this.modalData.event);
  }

  onDelete(){
    this.deleteEvent(this.modalData.event);
    this.modalData = null;
  }

  onFilter(type: string){
    this.filter = type;
  }

  onAddEvent(event: Meal | Workout){
    if(this.eventType === 'workout'){
      this.addEvent(event.name, 5, 6, this.eventType);
      this.events = [...this.events, new Event(event, this.eventType, 5, 6)];
    } else {
      this.addEvent(event.name, 5, 6, this.eventType);
      this.events = [...this.events, new Event(event, this.eventType, 5, 6)];
    }
  }

  onType(event: string){
    this.eventType = event;
  }

}
