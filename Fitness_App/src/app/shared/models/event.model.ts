export class Event{
    // public event: any;
    // public eventType: string;
    // public eventHourStart: number;
    // public eventHourEnd: number;

    constructor(
        public event: any,
        public eventType: string,
        public eventHourStart: number,
        public eventHourEnd: number,
    ){
        this.event = event;
        this.eventType = eventType;
        this.eventHourStart = eventHourStart;
        this.eventHourEnd = eventHourEnd;
    }
}