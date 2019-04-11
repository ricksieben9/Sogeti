import { Component, ViewChild, OnInit } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  event = {
    //id
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  minDate = new Date().toISOString();

  eventSource = [];

  calendar = {
    mode: 'day',
    currentDate: new Date()
  }

  viewTitle = '';

  @ViewChild(CalendarComponent) myCal : CalendarComponent;

  constructor(){}

  ngOnInit() {
    this.resetEvent();
  }

  resetEvent(){
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  addEvent(){
    
  }

  onEventSelected(){

  }

  onViewTitleChanged(){

  }

  onTimeSelected(){

  }


}
