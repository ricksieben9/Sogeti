import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {GroupService} from '../../services/group/group.service';

@Component({
  selector: 'app-receivers',
  templateUrl: 'receivers.page.html',
  styleUrls: ['receivers.page.scss']
})
export class ReceiversPage implements OnInit{

  groups;

  constructor(private activatedRoute: ActivatedRoute, private groupService: GroupService, private navCtrl: NavController) {
  }

  ngOnInit(): void {
    this.getGroups();
  }

  // get groupdata from group service
  private getGroups() {
    const groupObservable = this.groupService.getGroupsOfDispenser();
    groupObservable.subscribe(
        data => {
          this.groups = data;
          this.groups[0].open = true;
        },
        error => {
          console.log(error);
        });
  }

  // show or hide a group
  toggleGroup(index: number) {
    this.groups[index].open = !this.groups[index].open;
  }

  // navigate to intakemoments of receiver
  viewIntakeMoments(id: any) {
    this.navCtrl.navigateForward('/receiver/' + id + '/intakeMoments');
  }
}
