import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {User} from '../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserMissionService {
  private userInfo = new Subject<User>();

  constructor() {
  }

  /**
   * 接收用户信息
   */
  userInfoChangeHook = this.userInfo.asObservable();

  /**
   * 提交用户信息
   */
  commitUserInfoChange(user: User) {
    console.log(user);
    this.userInfo.next(user);
  }
}
