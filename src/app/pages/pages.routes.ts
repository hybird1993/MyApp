import {Routes} from '@angular/router';
import {PagesComponent} from './pages.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'case', loadChildren: './case#CaseModule' },
    ]
  },
];
