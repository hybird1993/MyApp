import {Routes} from '@angular/router';
import {PagesComponent} from './pages.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
  },
  { path: 'case', loadChildren: './case/case.module#CaseModule' }
];
