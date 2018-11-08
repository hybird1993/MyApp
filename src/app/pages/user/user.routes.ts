import {Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserInsertComponent} from './user-insert/user-insert.component';
import {UserDetailComponent} from './user-detail/user-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'list',
        component: UserListComponent
      },
      {
        path: 'insert',
        component: UserInsertComponent
      },
      {
        path: 'detail',
        component: UserDetailComponent
      }
    ]
  }
]
