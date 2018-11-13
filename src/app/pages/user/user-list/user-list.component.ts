import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../core/service/user-service/user.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {CommonUtils} from '../../../core/utils/common-utils';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  dataSet = [];
  allChecked = false;
  indeterminate = false;
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.checkAll(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.dataSet.forEach((data, index) => data.checked = index % 2 !== 0);
        this.refreshStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.dataSet.forEach((data, index) => data.checked = index % 2 === 0);
        this.refreshStatus();
      }
    }
  ];
  format = CommonUtils.dateFormat;

  constructor(
    private $service: UserService,
    private $message: NzMessageService,
    private $router: Router,
    public translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const msg = this.translateService.instant('loading');
    this.$message.loading(msg);
    this.$service.getUsersList().then(result => {
      this.$message.remove();
      console.log();
      let data = [];
      result.data.forEach(item => {
        const createTime = item.create_time ? this.format('yyyy/MM/dd hh:mm:ss', new Date(item.create_time)) : '';
        data.push({
          name: item.name,
          age: item.age,
          nickname: item.nickname,
          email: item.email,
          createTime: createTime
        });
      });
      console.log(data);
      this.dataSet = data;
    }, err => {
      this.$message.error(err.msg);
    });
  }

  go(url) {
    this.$router.navigate([url]);
  }

  refreshStatus(): void {
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.dataSet.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  /**
   * 删除用户
   * @param ids  array|string|number
   */
  delete(ids) {

  }

  /**
   * 删除用户
   * @param ids  array|string|number
   */
  deleteUsers(ids) {

  }
}
