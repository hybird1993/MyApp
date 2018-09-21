import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {en_US, zh_CN, NzI18nService} from 'ng-zorro-antd';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  title = 'case';
  constructor(
     private router: Router,
     public translateService: TranslateService,
     private nzI18nService: NzI18nService
  ) {
    this.title = this.translateService.instant('loading');
    this.translateService.onLangChange
      .subscribe(() => {
        this.title = this.translateService.instant('loading');
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
   * @param lang
   */
  changeLang(lang) {
    console.log(lang);
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
   // const nzLang = lang === 'zh' ? zh_CN : en_US;
   // this.nzI18nService.setLocale(nzLang);
  }

}
