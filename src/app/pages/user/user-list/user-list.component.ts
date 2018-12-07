import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {UserService} from '../../../core/service/user-service/user.service';
import {NzMessageService, NzModalRef, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {CommonUtils} from '../../../core/utils/common-utils';
import {QueryParams} from '../../../core/service/QueryParams';
import {FormFactory, FormPropsConfig} from '../../../shared/components/form/form.props.config';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {CommonSetting} from '../../../core/utils/common-setting';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
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
  tplModal: NzModalRef;
  tplModalButtonLoading = false;
  config: FormPropsConfig;
  data = {
    new_password: null,
    re_password: null
  };
  id;

  constructor(
    private $userService: UserService,
    private $message: NzMessageService,
    public $router: Router,
    public translateService: TranslateService,
    private modalService: NzModalService,
    private formFactory: FormFactory,
  ) { }

  ngOnInit(): void {
    this.getData();
    this.config = this.formFactory.createForm({
      items: [
        {
          key: 'new_password',
          type: 'password',
          placeholder: '',
          label: 'user.password.new',
          inputWith: '200px',
          rules: [{required: true}],
          asyncRules: [
            {
              asyncRule: (control: FormControl) => {
                return Observable.create(observer => {
                  const new_pwd = control.value;
                  const re_pwd = this.config.formGroup.value.re_password;
                  observer.next(!re_pwd || re_pwd === new_pwd ? null : {
                    error: false,
                    duplicated: true
                  });
                  observer.complete();
                });
              },
              asyncCode: 'duplicated',
              msg: '两次密码不一致'
            }
          ],
          relation: ['re_password']
        },
        {
          key: 're_password',
          type: 'password',
          placeholder: '',
          label: 'user.password.confirm',
          inputWith: '200px',
          rules: [{required: true}],
          asyncRules: [
            {
              asyncRule: (control: FormControl) => {

                return Observable.create(observer => {

                  const new_pwd = this.config.formGroup.value.new_password;
                  const re_pwd = control.value;
                  observer.next(re_pwd === new_pwd ? null : {
                    error: false,
                    duplicated: true
                  });
                  observer.complete();
                });
              },
              asyncCode: 'duplicated',
              msg: '两次密码不一致'
            }
          ],
          relation: ['new_password']
        },
      ],
      labelWidth: '148px',
      labelAlign: 'left',
    });
  }

  getData() {
    const msg = this.translateService.instant('common.tips.loading');
    this.loading = true;
    this.$userService.getUsersList(this.params).then(result => {
      this.loading = false;
      result.data.data.forEach((item: any) => {
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

  go(id) {
    const url = `/pages/user/detail/${id}`;
    this.$router.navigate([url], {});
  }

  refreshStatus(): void {
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    if (this.dataSet.length === 0) {
      this.allChecked = false;
    } else {
      this.allChecked = allChecked;
    }
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
    this.$userService.deleteUsers(id).then(result => {
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

  /**
   * 打开修改密码界面修改密码
   */
  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>, id) {
    this.id = id;
    this.tplModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      // nzOnOk: () => console.log('Click ok')
    });
  }

  destroyTplModal() {
    window.setTimeout(() => {
      this.tplModalButtonLoading = false;
      if (this.tplModal) {
        this.tplModal.destroy();
      }
    }, 0);
  }

  resetPwd() {
    this.tplModalButtonLoading = true;
    const password = this.config.formGroup.value.new_password;
    this.$userService.resetPassword(this.id, password).then(result => {
        this.$message.success('密码修改成功');
        this.tplModalButtonLoading = false;
        setTimeout(() => {
          this.destroyTplModal();
        }, CommonSetting.getToastDuration());
      }, err => {
        this.tplModalButtonLoading = false;
        this.$message.error(err.msg);
      }
    );
  }

  ngOnDestroy() {
    this.destroyTplModal();
  }
}
