import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './models/user';
import { config } from '../globals';

@Injectable({
  providedIn: 'root'
})

export class UserService {

    constructor(private http: HttpClient) { 
        console.log('config1', config);
        // var config1 = config1;
    }

    getAll() {
        return this.http.get<User[]>(`${config}/users`);
    }

    getById(id: number) {
        return this.http.get(`${config}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${config}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${config}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${config}/users/${id}`);
    }

    upper(user: User) {
        user.role = "admin";
    }

    addToGroup(user: User, group: string){
        console.log('the user', user, 'the group:', group);
        user.group = group;
    }
}
