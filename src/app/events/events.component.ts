import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: any;
  displayedColumns: string[] = ['thumbnail', 'name', 'image', 'video', 'edit'];
  dataSource: any;

  constructor() { }

  ngOnInit() {
  }

  createEvent() {

  }

  editEvent(event) {

  }
}
