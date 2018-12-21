import { Component, OnInit } from '@angular/core';
import {FormFactory, FormPropsConfig} from '../../shared/components/form/form.props.config';
import {UserService} from '../service/user-service/user.service';
import {en_US, zh_CN, NzI18nService, NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

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
  lang: string;
  constructor(private formFactory: FormFactory,
              private $userService: UserService,
              private $message: NzMessageService,
              public translateService: TranslateService,
              private nzI18nService: NzI18nService,
              private $router: Router,
              ) {
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'zh';
   // this.setDefaultLang();
    this.config = this.formFactory.createForm({
      items: [
        {
          key: 'username',
          type: 'input',
          removeLabel: true,
          placeholder: 'login.placeholder.username',
          rules: [{required: true}],
          inputWith: '200px',
        },
        {
          key: 'password',
          type: 'password',
          placeholder: 'login.placeholder.password',
          removeLabel: true,
          inputWith: '200px',
          rules: [{required: true}],
        },
      ],
      labelWidth: 148,
      labelAlign: 'left',
    });
    const a = this.$userService.getFile();
    console.log(a);
  }

  login() {
    const params = this.config.formGroup.value;
    console.log(params);
    this.$userService.login(params.username, params.password).then( result => {
      localStorage.setItem('auth', 'l');
      this.$router.navigate(['/pages']);
    }, error => {
      this.$message.error(error.msg);
    });
  }

  /**
   * 改变语言
   */
  setDefaultLang() {
    console.log('lang -->' + this.lang);
    this.translateService.use(this.lang);
    localStorage.setItem('lang', this.lang);
    const nzLang = this.lang === 'zh' ? zh_CN : en_US;
    this.nzI18nService.setLocale(nzLang);
  }

}
