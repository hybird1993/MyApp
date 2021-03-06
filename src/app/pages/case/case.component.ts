import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit {
  datas = [];

  btns = [];

  constructor(public translateService: TranslateService,
              private $router: Router) {
    this.setDatas();
  }

  ngOnInit() {
    this.translateService.onLangChange
      .subscribe(() => {
        this.setDatas();
      });
    this.btns = ['reactive-form', 'template-driven-form', 'my-form',
      'rxjs', 'http', 'typescript', 'lodash', 'life-circle', 'pipe', 'qunee'];
  }

  setDatas() {
    // 方法一
    // this.datas = [
    //   {name: this.translateService.instant('choose1')},
    //   {name: this.translateService.instant('choose2')}
    // ];
    // 方法二
    // this.translateService.get(['choose1', 'choose2']).subscribe(res => {
    //   this.datas = [
    //     {name: res.choose1},
    //     {name: res.choose2}
    //   ];
    // });
  }

  go(url) {
    return this.$router.navigate([`/pages/case/${url}`]);
  }
}
