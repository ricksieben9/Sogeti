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
  dateFormatter = this.dateFormat.getDates();
  currentWeek;
  currentDay

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
    const today = new Date;
    this.currentWeek = this.dateFormatter.getWeekNumber(today.getFullYear(), today.getMonth(), today.getDate())
  }


  //When agenda is done loading
  ngAfterViewInit() {
    this.loadTimeIndicator();
  }


  loadTimeIndicator() {
    const line = document.createElement('div');
    line.id = 'timeIndicator';
    document.querySelectorAll("#timeIndicator").forEach(e => e.parentNode.removeChild(e));
    if (this.calendar.mode == 'day') {
      const calendarGrid = document.querySelectorAll('.dayview-normal-event-container[ng-reflect-emit-event="false"]');
      const calendarcell = calendarGrid[0].querySelector(".dayview-normal-event-table > tbody > tr > .calendar-cell");
      calendarcell.prepend(line);
    }
    if (this.calendar.mode == 'week') {
      const calendarGrid = document.querySelectorAll('.weekview-normal-event-container[ng-reflect-emit-event="false"]');
      const calendarcell = calendarGrid[0].querySelectorAll(".weekview-normal-event-table > tbody > tr > .calendar-cell");
      calendarcell[this.calendar.currentDate.getDay() - 1].prepend(line);
    }

    const d = new Date();
    const pos = (d.getHours() * 36.875) + (d.getMinutes() * 0.6145833);
    line.style.top = pos + 'px';
    setInterval(function () {
      const d = new Date();
      const pos = (d.getHours() * 36.875) + (d.getMinutes() * 0.6145833);
      line.style.top = pos + 'px';
    }, 60000);
  }


  //Change mode to 'day', 'week, or 'month'
  changeMode(mode) {
    if (this.calendar.mode == mode)
      this.today();
    this.calendar.mode = mode;
  }


  //Previous date
  back() {
    const swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }


  //Next date
  next() {
    const swiper = document.querySelector('.swiper-container')['swiper'];
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
    this.loadDayIndicator(title);
    this.viewTitle = title;
  }


  loadDayIndicator(title) {
    if (this.calendar.mode == 'week') {
      const titleParts = title.split(' ');
      if (titleParts[3] == this.currentWeek)
        this.loadTimeIndicator();
    }
    if (this.calendar.mode == 'day') {
      if (this.viewTitle.length == 0)
        this.currentDay = title;
      if (title == this.currentDay)
        this.loadTimeIndicator()
    }
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