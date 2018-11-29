import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public translate: TranslateService) {
    translate.addLangs(['zh', 'en']);	// 增加语言
    const lang = localStorage.getItem('lang') || 'zh';
    translate.setDefaultLang(lang);		// 设置默认语言
    translate.use(lang);				// 启用语言
    localStorage.setItem('lang', lang);
  }
}
