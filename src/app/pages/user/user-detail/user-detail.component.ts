import { Component, OnInit } from '@angular/core';
import {User} from '../../../core/models/user';
import {FormFactory, FormPropsConfig} from '../../../shared/components/form/form.props.config';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonSetting} from '../../../core/utils/common-setting';
import {UserService} from '../../../core/service/user-service/user.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  data: User = new User();
  config: FormPropsConfig;
  buttons = [];
  timer;
  id;
  constructor(
    private formFactory: FormFactory,
    private $userService: UserService,
    private $message: NzMessageService,
    private $router: Router,
    private $active: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.config = this.formFactory.createForm({
      items: [
        {
          key: 'name',
          type: 'input',
          label: 'user.username',
          required: true,
          disabled: true,
          rules: [{required: true}],
          inputWith: '200px',
        },
        {
          key: 'nickname',
          type: 'input',
          label: 'user.nickname',
          inputWith: '200px',
        },
        {
          key: 'email',
          type: 'input',
          label: 'user.email',
          inputWith: '200px',
        }
      ],
      labelWidth: 148,
      labelAlign: 'left',
    });

    this.buttons = [
      {
        text: 'common.operate.save',
        check: true,
        type: 'primary',
        clickEvent: () => {
          this.save();
        }
      },
      {
        text: 'common.operate.back',
        clickEvent: () => {
          this.$router.navigate(['/pages/user/list']);
        }
      }
    ];

    this.$active.params.subscribe(params => {
      this.id = params.id;
      this.getUserInfo();
    });
  }

  getUserInfo() {
    if (this.id) {
      this.$userService.getUserInfoById(this.id).then(result => {
         this.showUserInfo(result.data);
      });
    } else {
      this.$userService.getUserInfo().then(result => {
        this.showUserInfo(result.data);
      });
    }
  }

  showUserInfo(data) {
    this.data = data;
    this.config.formGroup.reset(this.data);
  }

  save() {
    const params: User = this.config.formGroup.value;
    params.id = this.id;
    this.$userService.modifyUser(params).then(result => {
      this.$message.success('保存成功');
      setTimeout(() => {
        this.$message.remove();
        this.$router.navigate(['/pages/user/list']);
      }, CommonSetting.getToastDuration());
    }, err => {
      this.$message.error(err.msg);
    });
  }


}
