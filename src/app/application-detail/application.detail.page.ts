import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {list} from 'tar';
import {forEach} from '@angular-devkit/schematics';

@Component({
    selector: 'app-application.detail',
    templateUrl: './application.detail.page.html',
    styleUrls: ['./application.detail.page.scss'],
})
export class ApplicationDetailPage implements OnInit {
    Id = null;
    todos = [
        {name: 'item1', description: 'temp' , completed: false},
        {name: 'item2', completed: false},
        {name: 'item3', completed: false},
        {name: 'item4', completed: false},
        {name: 'item5', completed: false},
        {name: 'item6', completed: false},
        {name: 'item7', completed: false}
    ];
    list = [];


    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        // this.Id = this.activatedRoute.snapshot.paramMap.get('id');
    }

    submit() {
        const t = [];
        this.todos.forEach(function (elem, index) {
            if (elem.completed) {
                t.push(elem);
            }
        });
        this.todos = this.todos.filter(i => !i.completed);
        this.list = this.list.concat(t);
        console.log(this.todos);
        console.log(this.list);
    }

    delete(item) {
        item.completed = false;
        this.todos.push(item);
        this.list = this.list.filter(i => i.name !== item.name);
    }
}
