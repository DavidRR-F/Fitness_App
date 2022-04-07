import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Event } from "../shared/models/event.model";
import { SchedulerService } from "./scheduler.service";


@Injectable({providedIn: 'root'})
export class classEventsResolver implements Resolve<Event[]>{

    constructor(
        private schedulerService: SchedulerService
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Event[]> | [] {
        const day = route.params['day']
        
        return this.schedulerService.onSchedulerSub(new Date(day))
    }
    
}