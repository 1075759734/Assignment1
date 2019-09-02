import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../models/user';
import { UserService } from '../user.service';
import { AuthenticationService } from '../authentication.service';
import { Group } from '../models/group';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    groups: Group[] = [];
    isSuper: any;
    groupName: any;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private groupService: GroupService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
            if (this.currentUser.role == 'super'){
              this.isSuper = true;
            }else{
              this.isSuper = false;
            }
            console.log(this.isSuper, this.currentUser.role, user);
        });
    }

    ngOnInit() {
        this.loadAllUsers();
        this.loadAllGroups();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }
    deleteGroup(id: number) {
      this.groupService.delete(id).pipe(first()).subscribe(() => {
          this.loadAllGroups()
      });
    }
    upperUser(user: User) {
        this.userService.upper(user);
        this.loadAllUsers();
        
    }
    addToGroup(user: User) {
        console.log('addToGroup:', user.username,this.groupName);
        this.userService.addToGroup(user, this.groupName);
        this.loadAllUsers();
        
    }
    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
    private loadAllGroups() {
      this.groupService.getAll().pipe(first()).subscribe(groups => {
          this.groups = groups;
      });
  }
}
