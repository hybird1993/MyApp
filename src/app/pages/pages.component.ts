import {Component, DoCheck, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {en_US, zh_CN, NzI18nService, NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {UserService} from '../core/service/user-service/user.service';
import {FormFactory, FormPropsConfig} from '../shared/components/form/form.props.config';
import {UserMissionService} from '../mission-store/user.mission.service';
import {User} from '../core/models/user';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy {
  lang;
  user: User = new User();
  color: string = '#2196F3';
  tplModal: NzModalRef;
  tplModalButtonLoading = false;
  config: FormPropsConfig;
  data = {
    old_password: null,
    new_password: null,
    re_password: null
  };

  sub;
  constructor(
     private router: Router,
     public translateService: TranslateService,
     private nzI18nService: NzI18nService,
     private $server: UserService,
     private $message: NzMessageService,
     private $router: Router,
     private modalService: NzModalService,
     private formFactory: FormFactory,
     private $mission: UserMissionService
  ) {
    this.lang = localStorage.getItem('lang');
    console.log('lang --->' + this.lang);
    this.translateService.use(this.lang);
    // this.userManager = this.translateService.instant('user.userManager');
    // this.translateService.onLangChange.subscribe(() => {
      // this.userManager = this.translateService.instant('user.userManager');
      // this.translateService.get(['loading']).subscribe(res => {
      //   this.title = res.loading;
      // });
    // });
  }

  ngOnInit() {
    const userInfo = sessionStorage.getItem('USER_INFO');
    this.$server.getUserInfo().then(result => {
      this.user = result.data;
    });

    this.sub = this.$mission.userInfoChangeHook.subscribe(data => {
      this.user = data;
    });
    this.config = this.formFactory.createForm({
      items: [
        {
          key: 'old_password',
          type: 'password',
          label: 'old_password',
          placeholder: '',
          rules: [{required: true}],
          inputWith: '200px',
          modelChange: (controls, event) => {
          }
        },
        {
          key: 'new_password',
          type: 'password',
          placeholder: '',
          label: 'new_password',
          inputWith: '200px',
          rules: [{required: true}],
          modelChange: (controls, event) => {
          }
        },
        {
          key: 're_password',
          type: 'password',
          placeholder: '',
          label: 'confirm_password',
          inputWith: '200px',
          rules: [{required: true}],
          modelChange: (controls, event) => {
          }
        },
      ],
      labelWidth: '148px',
      labelAlign: 'left',
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  go(url) {
    this.router.navigate([`pages/${url}`], {}).then(() => {});
  }

  /**
   * 改变语言
   */
  changeLang() {
    console.log(this);
    console.log(this.user);
    console.log(this.lang);
    this.translateService.use(this.lang);
    localStorage.setItem('lang', this.lang);
    // const nzLang = lang === 'zh' ? zh_CN : en_US;
    // this.nzI18nService.setLocale(nzLang);
  }

  /**
   * 打开修改密码界面修改密码
   */
  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>) {
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
      this.tplModal.destroy();
    }, 0);
  }

  /**
   * 退出登录
   */
  loginOut() {
    localStorage.removeItem('auth');
    this.$router.navigate(['/login'], {});
    // this.$server.loginOut().then(result => {
    //   localStorage.removeItem('auth');
    //   this.$router.navigate(['/login'], {});
    // }, err => {
    //   this.$message.error(err.msg);
    // });
  }

  /**
   * 修改资料
   */
  modify() {
    this.tplModalButtonLoading = true;
  }
}
