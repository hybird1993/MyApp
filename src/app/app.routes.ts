import {Routes} from '@angular/router';
import {Error404Component} from './core/error404/error404.component';
import {LoginComponent} from './core/login/login.component';
import {AppGuard} from './app.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/pages' },
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule', canActivate: [AppGuard]},
  { path: 'login', component: LoginComponent },
  { path: '**', component: Error404Component}
];
