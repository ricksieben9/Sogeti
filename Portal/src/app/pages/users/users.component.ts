import { Component, OnInit } from '@angular/core';


import { UsersService } from '../../service/users.service';
@Component({
  selector: 'app-icons',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
user;
  public copy: string;
  constructor(private usersService: UsersService) {

  }



  ngOnInit() {

    const userObservable = this.usersService.getAllUsers();
    userObservable.subscribe((userData: any[]) => {
      console.log(userData);
      this.user = userData;
    });


  }
}
