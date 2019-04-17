import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {

  constructor() {}

  dateFormatter = {
    formatDayViewTitle: function (date: Date) {
      var months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
      return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    },
    formatWeekViewTitle: function (date: Date) {
      var months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
      return months[date.getMonth()] + " " + date.getFullYear() // TODO: week number?;
    },
    formatMonthViewTitle: function (date: Date) {
      var months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
      return months[date.getMonth()] + " " + date.getFullYear();
    },
    formatDayViewHourColumn: function (date: Date) {
      return date.getHours() + ":" + date.getMinutes() + '0';
    },
    formatWeekViewHourColumn: function (date: Date) {
      return date.getHours() + ":" + date.getMinutes() + '0';
    },
    formatWeekViewDayHeader: function (date: Date) {
      var days = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
      return days[date.getDay()] + " " + date.getDate();
    },
    formatMonthViewDayHeader: function (date: Date) {
      var days = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
      return days[date.getDay()]
    },
  };


  getDates(){
    return this.dateFormatter
  }

}
