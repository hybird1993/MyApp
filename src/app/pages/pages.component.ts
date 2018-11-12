import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {en_US, zh_CN, NzI18nService, NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {UserService} from '../core/service/user-service/user.service';
import {error} from 'util';
import {FormPropsConfig} from '../shared/components/form/form.props.config';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  case = 'case';
  lang;
  text: string = 'admin';
  color: string = '#2196F3';
  userList: string;
  userManager: string;
  tplModal: NzModalRef;
  tplModalButtonLoading = false;
  config: FormPropsConfig;
  data = {
    username: null,
    old_password: null,
    new_password: null,
    re_password: null
  };
  constructor(
     private router: Router,
     public translateService: TranslateService,
     private nzI18nService: NzI18nService,
     private $server: UserService,
     private $message: NzMessageService,
     private $router: Router,
     private modalService: NzModalService,
  ) {
    this.lang = localStorage.getItem('lang');
    console.log('lang --->' + this.lang);
    this.translateService.use(this.lang);
    this.case = this.translateService.instant('menu-case');
    this.userList = this.translateService.instant('user.userList');
    this.userManager = this.translateService.instant('user.userManager');
    this.translateService.onLangChange
      .subscribe(() => {
        this.case = this.translateService.instant('menu-case');
        this.userList = this.translateService.instant('user.userList');
        this.userManager = this.translateService.instant('user.userManager');
       //  this.translateService.get(['loading']).subscribe(res => {
       //    this.title = res.loading;
       //  });
      });
  }

  ngOnInit() {
  }
  go(url) {
    this.router.navigate([`pages/${url}`], {}).then(() => {});
  }

  /**
   * 改变语言
   */
  changeLang() {
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

   // window.setTimeout(() => modal.destroy(), 1000);
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
