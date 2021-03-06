import { Injectable } from '@angular/core';
import {UserInterface} from './user.interface';
import {HttpClient} from '@angular/common/http';
import {EntitiesResult, Result} from '../Result';
import {User} from '../../models/user';
import {QueryParams} from '../QueryParams';

@Injectable()
export class UserService implements UserInterface {

  constructor(
    private $http: HttpClient,
  ) { }

  getUsersList(params: QueryParams): Promise<Result<EntitiesResult<User>>> {
    return new Promise((resolve, reject) => {
      this.$http.post('/api/user/list', params).subscribe((result: Result<any>) => {
        result.code === 0 ? resolve(result) : reject(result);
      });
    });
  }

  login(name: string, password: string): Promise<Result<any>> {
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

  checkUserExist(username: string): Promise<Result<any>> {
    return new Promise((resolve, reject) => {
      this.$http.get(`/api/user/checkUserName/${username}`).subscribe((result: Result<any>) => {
        result.code === 0 ? resolve(result) : reject(result);
      });
    });
  }

  loginOut(): Promise<Result<any>> {
    return new Promise((resolve, reject) => {
      this.$http.get(`/api/user/loginOut`).subscribe((result: Result<any>) => {
        result.code === 0 ? resolve(result) : reject(result);
      });
    });
  }

  modify(params: User): Promise<Result<any>> {
    return new Promise((resolve, reject) => {
      this.$http.post(`/api/user/modify`, User).subscribe((result: Result<any>) => {
        result.code === 0 ? resolve(result) : reject(result);
      });
    });
  }

  getUserInfo(): Promise<Result<any>> {
    return new Promise((resolve, reject) => {
      this.$http.get(`/api/user/getUserInfo`).subscribe((result: Result<any>) => {
        result.code === 0 ? resolve(result) : reject(result);
      });
    });
  }

  getUserInfoById(id): Promise<Result<any>> {
    return new Promise((resolve, reject) => {
      this.$http.get(`/api/user/getUserInfo/${id}`).subscribe((result: Result<any>) => {
        result.code === 0 ? resolve(result) : reject(result);
      });
    });
  }

  deleteUsers(ids): Promise<Result<any>> {
    return new Promise((resolve, reject) => {
      this.$http.post(`/api/user/delete`, {ids}).subscribe((result: Result<any>) => {
        result.code === 0 ? resolve(result) : reject(result);
      });
    });
  }

  modifyUser(user: User): Promise<Result<any>> {
    return new Promise((resolve, reject) => {
      this.$http.post(`/api/user/modify`, user).subscribe((result: Result<any>) => {
        result.code === 0 ? resolve(result) : reject(result);
      });
    });
  }

  modifyPassword(oldPwd, newPwd): Promise<Result<any>> {
    return new Promise((resolve, reject) => {
      this.$http.post(`/api/user/modifyPassword`, {oldPwd, newPwd}).subscribe((result: Result<any>) => {
        result.code === 0 ? resolve(result) : reject(result);
      });
    });
  }

  resetPassword(id, password): Promise<Result<any>> {
    return new Promise((resolve, reject) => {
      this.$http.post(`/api/user/resetPassword`, {id, password}).subscribe((result: Result<any>) => {
        result.code === 0 ? resolve(result) : reject(result);
      });
    });
  }

  async getFile() {
     // return await this.$http.get(`../../../../assets/offline-map/map_load.js`);
    return await this.$http.get(`/api/user/checkUserName/admin`);
  }

}
