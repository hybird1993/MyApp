import { Injectable } from '@angular/core';
import {UserInterface} from './user.interface';
import {HttpClient} from '@angular/common/http';
import {Result} from '../Result';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService implements UserInterface {

  constructor(
    private $http: HttpClient,
  ) { }

  getUsersList(): Promise<Result<any>> {
    return new Promise((resolve, reject) => {
      this.$http.get('/api/user/list').subscribe((result: Result<any>) => {
        result.code === 0 ? resolve(result) : reject(result);
      });
    });
  }

  login(name, password): Promise<Result<any>> {
    return new Promise((resolve, reject) => {
      this.$http.post('/api/user/login', {name, password}).subscribe((result: Result<any>) => {
        result.code === 0 ? resolve(result) : reject(result);
      });
    });
  }

  register(params: User): Promise<Result<any>> {
    return new Promise((resolve, reject) => {
      this.$http.post('/api/user/register', params).subscribe((result: Result<any>) => {
        result.code === 0 ? resolve(result) : reject(result);
      });
    });
  }

  checkUserExist(username): Promise<Result<any>> {
    return new Promise((resolve, reject) => {
      this.$http.get(`/api/user/checkUserName/${username}`).subscribe((result: Result<any>) => {
        result.code === 0 ? resolve(result) : reject(result);
      });
    });
  }
}
