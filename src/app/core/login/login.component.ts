import { Component, OnInit } from '@angular/core';
import {FormFactory, FormPropsConfig} from '../../shared/components/form/form.props.config';
import {UserService} from '../service/user-service/user.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  config: FormPropsConfig;
  data = {
    username: null,
    password: null
  };
  constructor(private formFactory: FormFactory,
              private $userService: UserService,
              private $message: NzMessageService,
              private $router: Router) {
  }

  ngOnInit(): void {
    this.config = this.formFactory.createForm({
      items: [
        {
          key: 'username',
          type: 'input',
          removeLabel: true,
          placeholder: '请输入您的用户名',
          rules: [{required: true}],
          inputWith: '200px',
          modelChange: (controls, event) => {
          }
        },
        {
          key: 'password',
          type: 'password',
          placeholder: '请输入您的密码',
          removeLabel: true,
          inputWith: '200px',
          rules: [{required: true}],
          modelChange: (controls, event) => {
          }
        },
      ],
      labelWidth: 148,
      labelAlign: 'left',
    });
  }

  login() {
    const params = this.config.getData();
    console.log(params);
    this.$userService.login(params.username, params.password).then( result => {
      localStorage.setItem('auth', 'l');
      this.$router.navigate(['/pages']);
    }, error => {
      this.$message.error(error.msg);
    });
  }
}
