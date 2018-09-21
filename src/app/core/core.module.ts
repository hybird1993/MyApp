import {NgModule, Optional, SkipSelf} from '@angular/core';
import {Error404Component} from './error404/error404.component';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {LoginComponent} from './login/login.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {UserService} from './service/user-service/user.service';

const SERVICE_PROVIDERS = [
  {provide: UserService, useClass: UserService},
]

@NgModule({
  imports: [CommonModule, SharedModule, NgZorroAntdModule],
  declarations: [Error404Component, LoginComponent],
  providers: [...SERVICE_PROVIDERS],
  exports: []
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
