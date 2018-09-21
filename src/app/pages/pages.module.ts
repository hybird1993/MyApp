import {NgModule} from '@angular/core';
import {PagesComponent} from './pages.component';
import {RouterModule} from '@angular/router';
import {routes} from './pages.routes';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PagesComponent],
  providers: [],
  exports: []
})

export class PagesModule {
}
