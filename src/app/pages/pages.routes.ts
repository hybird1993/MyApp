import {Routes} from '@angular/router';
import {PagesComponent} from './pages.component';
import {ToolsComponent} from './tools/tools.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'case', loadChildren: './case#CaseModule' },
      { path: 'user', loadChildren: './user#UserModule' },
      { path: 'tools', component: ToolsComponent },
    ]
  },
];
