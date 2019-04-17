import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { DateFormatterService } from '../providers/date-formatter.service'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  minDate = new Date().toISOString();
  eventSource = [];
  viewTitle = '';
  currentDay = '';

  event = {
    //id
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  calendar = {
    allDay: false,
    mode: 'day',
    currentDate: new Date(),
    dateFormatter: this.dateFormat.getDates()
  }



  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, private dateFormat: DateFormatterService) { }


  //Before agenda has loaded
  ngOnInit() {
    // this.resetEvent();
  }


  //When agenda is done loading
  ngAfterViewInit() {
    this.loadTimeIndicator()
  }


  loadTimeIndicator() {
    var line = document.createElement('div');
    line.id = 'timeIndicator';
    var calendarGrid = document.querySelectorAll('.dayview-normal-event-container[ng-reflect-emit-event="false"]');
    var calendarcell = calendarGrid[0].querySelector(".dayview-normal-event-table > tbody > tr > .calendar-cell");
    document.querySelectorAll("#timeIndicator").forEach(e => e.parentNode.removeChild(e));
    calendarcell.prepend(line)
    var d = new Date();
    var pos = (d.getHours() * 36.875) + (d.getMinutes() * 0.6145833);
    line.style.top = pos + 'px';
    setInterval(function () {
      var d = new Date();
      var pos = (d.getHours() * 36.875) + (d.getMinutes() * 0.6145833);
      line.style.top = pos + 'px';
    }, 60000);
  }


  //Change mode to 'day', 'week, or 'month'
  changeMode(mode) {
    if (this.calendar.mode == 'day' && mode == 'day')
      this.today();
    this.calendar.mode = mode;
  }


  //Previous date
  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }


  //Next date
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }


  //Go to today
  today() {
    this.calendar.currentDate = new Date();
  }


  //When event is clicked
  async onEventSelected(event) {
    let start = formatDate(event.startTime, 'medium', this.locale);
    const alert = await this.alertCtrl.create({
      header: "Ontvanger: " + event.title,
      subHeader: "Medicijn: " + event.desc,
      message: 'Om: ' + start,
      buttons: ['OK']
    });
    alert.present();
  }


  //Get event time in week and month mode
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }


  //When switched to another day or calendar mode
  onViewTitleChanged(title) {
    this.loadDayIndicator(title)
    this.viewTitle = title;
  }


  loadDayIndicator(title) {
    if (this.viewTitle.length == 0)
      this.currentDay = title;
    if (title == this.currentDay)
      this.loadTimeIndicator()
  }
}

//Code for adding events within the mobile app

  // resetEvent() {
  //   this.event = {
  //     title: '',
  //     desc: '',
  //     startTime: new Date().toISOString(),
  //     endTime: new Date().toISOString(),
  //     allDay: false
  //   };
  // }

  // addEvent() {
  //   let eventCopy = {
  //     title: this.event.title,
  //     startTime: new Date(this.event.startTime),
  //     endTime: new Date(this.event.endTime),
  //     desc: this.event.desc
  //   }

  //   this.eventSource.push(eventCopy);
  //   this.myCal.loadEvents();
  //   this.resetEvent();

  // }