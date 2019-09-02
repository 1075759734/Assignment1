import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Channel } from './models/channel';
import { config } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private http: HttpClient) { 
    console.log('config1', config);
    // var config1 = config1;
  }

  getAll() {
      return this.http.get<Channel[]>(`${config}/channels`);
  }

  getById(id: number) {
      return this.http.get(`${config}/channels/${id}`);
  }

  register(channel: Channel) {
      return this.http.post(`${config}/channels/register`, channel);
  }

  update(channel: Channel) {
      return this.http.put(`${config}/channels/${channel.id}`, channel);
  }

  delete(id: number) {
      return this.http.delete(`${config}/channels/${id}`);
  }
}
