import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { routes } from './user.routes';
import { SharedModule } from '../../shared/shared.module';
import { UserInsertComponent } from './user-insert/user-insert.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserComponent, UserListComponent, UserInsertComponent, UserDetailComponent]
})
export class UserModule { }
