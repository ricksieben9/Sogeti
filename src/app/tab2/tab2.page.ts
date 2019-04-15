import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {

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
    allDay: false,
    mode: 'day',
    currentDate: new Date(),
    dateFormatter: {
      formatDayViewHourColumn: function (date: Date) {
        return date.getHours() + ":" + date.getMinutes() + '0';
      },
      formatWeekViewHourColumn: function (date: Date) {
        return date.getHours() + ":" + date.getMinutes() + '0';
      },
      formatWeekViewDayHeader: function(date:Date) {
        var days = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
       return days[date.getDay()] + " " + date.getDate();
    },
    formatMonthViewDayHeader: function(date:Date) {
      var days = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
      return days[date.getDay()]
  },
    }
  }

  viewTitle = '';

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    this.resetEvent();
    //this.loadTimeIndicator()
  }

  loadTimeIndicator(){
    var elem = document.getElementById("timeIndicator"); 
    var pos = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (pos == 350) {
        clearInterval(id);
      } else {
        pos++; 
        elem.style.top = pos + 'px'; 
      }
    }
  }

  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      desc: this.event.desc
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();

  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  async onEventSelected(event) {
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: "Ontvanger: " + event.title,
      subHeader: "Medicijn: " + event.desc,
      message: 'Om: ' + start,
      buttons: ['OK']
    });
    alert.present();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

}
