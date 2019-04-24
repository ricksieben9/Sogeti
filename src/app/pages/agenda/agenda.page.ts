import {Component, ViewChild, OnInit, Inject, LOCALE_ID, AfterViewInit} from '@angular/core';
import {CalendarComponent} from 'ionic2-calendar/calendar';
import {AlertController} from '@ionic/angular';
import {formatDate} from '@angular/common';
import {DateFormatterService} from '../../services/formatter/date-formatter.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'agenda.page.html',
    styleUrls: ['agenda.page.scss'],
})
export class AgendaPage implements OnInit, AfterViewInit {

    eventSource = [];
    viewTitle = '';
    dateFormatter = this.dateFormat.getDates();
    currentWeek;
    currentDay;

    calendar = {
        allDay: false,
        mode: 'day',
        currentDate: new Date(),
        dateFormatter: this.dateFormat.getDates()
    };


    @ViewChild(CalendarComponent) myCal: CalendarComponent;

    constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, private dateFormat: DateFormatterService) {}


    // Before agenda has loaded
    ngOnInit() {
        const today = new Date;
        this.currentWeek = this.dateFormatter.getWeekNumber(today.getFullYear(), today.getMonth(), today.getDate());
    }


    // When agenda is done loading
    ngAfterViewInit() {
        this.loadTimeIndicator();
        this.loadIntakeMoment();
    }


    loadTimeIndicator() {
        const line = document.createElement('div');
        line.id = 'timeIndicator';
        document.querySelectorAll('#timeIndicator').forEach(e => e.parentNode.removeChild(e));
        if (this.calendar.mode === 'day') {
            const calendarGrid = document.querySelectorAll('.dayview-normal-event-container[ng-reflect-emit-event="false"]');
            const calendarcell = calendarGrid[0].querySelector('.dayview-normal-event-table > tbody > tr > .calendar-cell');
            calendarcell.prepend(line);
        }
        if (this.calendar.mode === 'week') {
            const calendarGrid = document.querySelectorAll('.weekview-normal-event-container[ng-reflect-emit-event="false"]');
            const calendarcell = calendarGrid[0].querySelectorAll('.weekview-normal-event-table > tbody > tr > .calendar-cell');
            calendarcell[this.calendar.currentDate.getDay() - 1].prepend(line);
        }

        const startDate = new Date();
        const startPos = (startDate.getHours() * 36.875) + (startDate.getMinutes() * 0.6145833);
        line.style.top = startPos + 'px';
        setInterval(function () {
            const newDate = new Date();
            const newPos = (newDate.getHours() * 36.875) + (newDate.getMinutes() * 0.6145833);
            line.style.top = newPos + 'px';
        }, 60000);
    }


    // Change mode to 'day', 'week, or 'month'
    changeMode(mode) {
        if (this.calendar.mode === mode) {
            this.today();
        }
        this.calendar.mode = mode;
    }


    // Previous date
    back() {
        const swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slidePrev();
    }


    // Next date
    next() {
        const swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slideNext();
    }


    // Go to today
    today() {
        this.calendar.currentDate = new Date();
    }


    // When event is clicked
    async onEventSelected(event) {
        const start = formatDate(event.startTime, 'medium', this.locale);
        const alert = await this.alertCtrl.create({
            header: 'Ontvanger: ' + event.title + event.id,
            subHeader: 'Medicijn: ' + event.desc,
            message: 'Om: ' + start,
            buttons: ['OK']
        });
        alert.present();
    }

    // When switched to another day or calendar mode
    onViewTitleChanged(title) {
        this.loadDayIndicator(title);
        this.viewTitle = title;
    }


    loadDayIndicator(title) {
        if (this.calendar.mode === 'week') {
            const titleParts = title.split(' ');
            if (parseInt(titleParts[3], 0) === this.currentWeek) {
                this.loadTimeIndicator();
            }
        }
        if (this.calendar.mode === 'day') {
            if (this.viewTitle.length === 0) {
                this.currentDay = title;
            }
            if (title === this.currentDay) {
                this.loadTimeIndicator();
            }
        }
    }

    loadIntakeMoment() {
        const testMoment = {
            id: 1,
            title: 'intakemoment',
            startTime: new Date(2019, 3, 24, 12, 29),
            endTime: new Date(2019, 3, 24, 16, 29),
            desc: 'Jan moet medicatie innemen'
        };
        this.eventSource.push(testMoment);
        this.myCal.loadEvents();
    }
}

