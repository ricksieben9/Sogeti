import {Component, ViewChild, OnInit, Inject, LOCALE_ID, AfterViewInit} from '@angular/core';
import {CalendarComponent} from 'ionic2-calendar/calendar';
import {AlertController, NavController} from '@ionic/angular';
import {DateFormatterService} from '../../services/formatter/date-formatter.service';
import {IntakeMomentService} from '../../services/intake-moment/intake-moment.service';

@Component({
    selector: 'app-agenda',
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

    constructor(private alertCtrl: AlertController,
                @Inject(LOCALE_ID) private locale: string, private dateFormat: DateFormatterService,
                public navCtrl: NavController, private intakeMomentService: IntakeMomentService) {
    }


    ionViewWillEnter() {
        this.loadIntakeMoments();
    }

    // Before agenda has loaded
    ngOnInit() {
        const today = new Date;
        this.currentWeek = this.dateFormatter.getWeekNumber(today.getFullYear(), today.getMonth(), today.getDate());
        this.loadIntakeMoments();
    }


    // When agenda is done loading
    ngAfterViewInit() {
        this.loadTimeIndicator();
    }


    loadTimeIndicator() {
        const line = document.createElement('div');
        line.id = 'timeIndicator';
        document.querySelectorAll('#timeIndicator').forEach(e => e.parentNode.removeChild(e));
        if (this.calendar.mode === 'day') {
            const calendarGrid = document.querySelectorAll('.dayview-normal-event-container[ng-reflect-emit-event="false"]');
            const calendarCell = calendarGrid[0].querySelector('.dayview-normal-event-table > tbody > tr > .calendar-cell');
            calendarCell.prepend(line);
        }
        if (this.calendar.mode === 'week') {
            const calendarGrid = document.querySelectorAll('.weekview-normal-event-container[ng-reflect-emit-event="false"]');
            const calendarCell = calendarGrid[0].querySelectorAll('.weekview-normal-event-table > tbody > tr > .calendar-cell');
            calendarCell[this.calendar.currentDate.getDay() - 1].prepend(line);
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


    // When intake-moment is clicked
    async openIntakeMoment(intake) {
        this.navCtrl.navigateForward('/intakeMoment/' + intake.id);
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

    loadIntakeMoments() {
        let agenda: any;
        const add_minutes = function (dt, minutes) {
            return new Date(dt.getTime() + minutes * 60000);
        };
        this.intakeMomentService.getAllIntakeMoments().subscribe(res => {
            agenda = res;
        }, error => {
        }, () => {
            if (agenda) {
                for (const data of agenda) {
                    const event = {
                        id: data.id,
                        title: data.receiver_id.name,
                        startTime: new Date(data.intake_start_time),
                        endTime: add_minutes(new Date(data.intake_start_time), 30),
                        desc: data.remark
                    };
                    this.eventSource = [];
                    this.eventSource.push(event);
                }
            }
            this.myCal.loadEvents();
        });
    }
}
