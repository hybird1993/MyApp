import { Component, OnInit } from '@angular/core';
import {FormFactory, FormPropsConfig} from '../../../shared/components/form/form.props.config';
import {NzMessageService} from 'ng-zorro-antd';
import {UserService} from '../../../core/service/user-service/user.service';
import {Router} from '@angular/router';
import {User} from '../../../core/models/user';
import {CommonSetting} from '../../../core/utils/common-setting';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-insert',
  templateUrl: './user-insert.component.html',
  styleUrls: ['./user-insert.component.scss']
})
export class UserInsertComponent implements OnInit {
  data: User = new User();
  config: FormPropsConfig;
  buttons = [];
  timer;
  constructor(
    private formFactory: FormFactory,
    private $userService: UserService,
    private $message: NzMessageService,
    private $router: Router
  ) { }

  ngOnInit() {
    this.config = this.formFactory.createForm({
      items: [
        {
          key: 'name',
          type: 'input',
          label: 'user.username',
          required: true,
          rules: [{required: true}],
          asyncRules: [
            { asyncRule: (control: FormControl) => {
              return Observable.create(observer => {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                  this.$userService.checkUserExist(this.config.formGroup.value.name).then(
                    result => {
                      observer.next(result.data ? null : {error: false, duplicated: true});
                      observer.complete();
                    }, failed => {
                      observer.next({error: true, duplicated: true});
                      observer.complete();
                    }
                  );
                }, 500);
              });
              },
              asyncCode: 'duplicated',
              msg: '此名称已经存在'
            }
          ],
          inputWith: '200px',
        },
        {
          key: 'password',
          type: 'password',
          label: 'user.password.password',
          required: true,
          inputWith: '200px',
          rules: [{required: true}],
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
  }

  save() {
    const params: User = this.config.formGroup.value;
    this.$userService.register(params).then(result => {
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
