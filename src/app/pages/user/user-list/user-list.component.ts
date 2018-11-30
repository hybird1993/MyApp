import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../core/service/user-service/user.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {CommonUtils} from '../../../core/utils/common-utils';
import {QueryParams} from '../../../core/service/QueryParams';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  dataSet = [];
  params: QueryParams = new QueryParams();
  totalCount: number = 0;
  // pageSize: number = this.params.pageSize;
  // pageNum: number = this.params.pageNum;
  allChecked = false;
  indeterminate = false;
  loading: boolean = false;
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
    this.loading = true;
    this.$service.getUsersList(this.params).then(result => {
      this.loading = false;
      result.data.data.forEach(item => {
        item.createTime = item.create_time ? this.format('yyyy/MM/dd hh:mm:ss', new Date(item.create_time)) : '';
      });
      this.dataSet = result.data.data;
      this.totalCount = result.data.totalCount;
      this.refreshStatus();
      console.log(this.params);
    }, err => {
      this.loading = false;
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

  searchData() {
    this.getData();
  }

  /**
   * 删除用户
   * @param ids  array|number
   */
  delete(id) {
    console.log(id);
    this.$service.deleteUsers(id).then(result => {
      console.log(result);
      if (result.data.success > 0) {
        this.params.pageNum = 1;
        this.getData();
      }
    }, err => {
      this.$message.error(err.msg);
    });
  }

  /**
   * 删除用户
   */
  deleteUsers() {
    const arr = [];
    this.dataSet.forEach(item => {
      if (item.checked) {
        arr.push(item.id);
      }
    });
    this.delete(arr);
  }
}
