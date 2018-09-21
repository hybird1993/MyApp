import { Injectable } from '@angular/core';
import {UserInterface} from './user.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService implements UserInterface {

  constructor(
    private $http: HttpClient,
  ) { }

  getUserList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.$http.get('/api/user/getUserInfo').subscribe(result => {
        console.log(result);
        resolve(result);
      });
    });
  }
}
