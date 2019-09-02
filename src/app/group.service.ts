import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Group } from './models/group';
import { config } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { 
    console.log('config1', config);
    // var config1 = config1;
  }

  getAll() {
      return this.http.get<Group[]>(`${config}/groups`);
  }

  getById(id: number) {
      return this.http.get(`${config}/groups/${id}`);
  }

  register(group: Group) {
      return this.http.post(`${config}/groups/register`, group);
  }

  update(group: Group) {
      return this.http.put(`${config}/groups/${group.id}`, group);
  }

  delete(id: number) {
      return this.http.delete(`${config}/groups/${id}`);
  }

}
