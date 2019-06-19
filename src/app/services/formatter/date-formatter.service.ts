import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateFormatterService {


    constructor() {}

    // Object with format functions returning dates in dutch
    dateFormatter = {
        months: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
            'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
        days: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'],
        date: new Date,
        formatDayViewTitle: function (date: Date) {

            return date.getDate() + ' ' + this.dateFormatter.months[date.getMonth()] + ' ' + date.getFullYear();
        },
        formatWeekViewTitle: function (date: Date) {
            return this.dateFormatter.months[date.getMonth()] + ' ' + date.getFullYear() + ', Week ' +
                this.dateFormatter.getWeekNumber(date.getFullYear(), date.getMonth(), date.getDate());
        },
        formatMonthViewTitle: function (date: Date) {
            return this.dateFormatter.months[date.getMonth()] + ' ' + date.getFullYear();
        },
        formatDayViewHourColumn: function (date: Date) {
            return date.getHours() + ':' + date.getMinutes() + '0';
        },
        formatWeekViewHourColumn: function (date: Date) {
            return date.getHours() + ':' + date.getMinutes() + '0';
        },
        formatWeekViewDayHeader: function (date: Date) {
            return this.dateFormatter.days[date.getDay()] + ' ' + date.getDate();
        },
        formatMonthViewDayHeader: function (date: Date) {
            return this.dateFormatter.days[date.getDay()];
        },
        getWeekNumber(year, month, day) {   // Calculate week number
            month += 1; // Start with month 1
            const a = Math.floor((14 - (month)) / 12);
            const y = year + 4800 - a;
            const m = (month) + (12 * a) - 3;
            const jd = day + Math.floor(((153 * m) + 2) / 5) +
                (365 * y) + Math.floor(y / 4) - Math.floor(y / 100) +
                Math.floor(y / 400) - 32045;      // (gregorian calendar)
            const d4 = (jd + 31741 - (jd % 7)) % 146097 % 36524 % 1461;
            const L = Math.floor(d4 / 1460);
            const d1 = ((d4 - L) % 365) + L;
            const weekNumber = Math.floor(d1 / 7) + 1;
            return weekNumber;
        },
    };

    // Needed for the calendar
    getDates() {
        return this.dateFormatter;
    }

    // Format date to uu:mm dd-mm-yy
    formatDate(date) {
        const dateF = new Date(date);
        return dateF.getHours() + ':' + (dateF.getMinutes() < 10 ? '0' : '') + dateF.getMinutes()
            + ' ' + dateF.getDate() + '-' + dateF.getMonth() + '-' + dateF.getFullYear();
    }
}
