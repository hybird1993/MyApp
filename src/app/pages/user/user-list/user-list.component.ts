import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../core/service/user-service/user.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  dataSet = [];
  constructor(
    private $service: UserService,
    private $message: NzMessageService,
    private $router: Router,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.$message.loading('获取中...');
    this.$service.getUsersList().then(result => {
      this.$message.remove();
      console.log();
      let data = [];
      result.data.forEach(item => {
        data.push({
          name: item.name,
          age: item.age,
          nickname: item.nickname,
          email: item.email,
          createTime: item.create_time
        });
      });
      console.log(data)
      this.dataSet = data;
    }, err => {
      this.$message.error(err.msg);
    });
  }

  go(url) {
    this.$router.navigate([url]);
  }
}
