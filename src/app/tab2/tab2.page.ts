import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import {AlertController, NavController} from '@ionic/angular';
import { formatDate } from '@angular/common';

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

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID)private locale: string, public navCtrl: NavController){}

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
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    if(eventCopy.allDay){
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      //2019, 
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate() + 1));
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();

  }

  changeMode(mode){
    this.calendar.mode = mode;
  }

  back(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  today(){
    this.calendar.currentDate = new Date();
  }

  async onEventSelected(event){
    // let start = formatDate(event.startTime, 'medium', this.locale);
    // let end = formatDate(event.endTime, 'medium', this.locale);
    //
    // const alert = await this.alertCtrl.create({
    //   header: event.title,
    //   subHeader: event.desc,
    //   message: 'From: '+ start + '<br><br>tot: ' + end,
    //   buttons: ['OK']
    // });
    // alert.present();
    this.navCtrl.navigateForward('/application/1');
  }

  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  onTimeSelected(ev){
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }
}
