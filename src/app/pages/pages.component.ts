import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {en_US, zh_CN, NzI18nService} from 'ng-zorro-antd';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  case = 'case';
  lang = 'zh';
  text: string = 'admin';
  color: string = '#2196F3';
  constructor(
     private router: Router,
     public translateService: TranslateService,
     private nzI18nService: NzI18nService
  ) {
    this.translateService.setDefaultLang(this.lang);
    this.case = this.translateService.instant('menu-case');
    this.translateService.onLangChange
      .subscribe(() => {
        this.case = this.translateService.instant('menu-case');
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
    // const nzLang = lang === 'zh' ? zh_CN : en_US;
    // this.nzI18nService.setLocale(nzLang);
  }

}
