import {NgModule} from '@angular/core';
import {CaseComponent} from './case.component';
import {RouterModule} from '@angular/router';
import {routes} from './case.routes';
import {SharedModule} from '../../shared/shared.module';
import { TemplateDrivenFormComponent } from './template-driven-form';
import { ReactiveFormComponent } from './reactive-form';
import { MyFormComponent } from './my-form/my-form.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { HttpComponent } from './http/http.component';
import { MarkerMapComponent } from './marker-map/marker-map.component';
import { TypescriptComponent } from './typescript/typescript.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CaseComponent,
    TemplateDrivenFormComponent,
    ReactiveFormComponent,
    MyFormComponent,
    RxjsComponent,
    HttpComponent,
    MarkerMapComponent,
    TypescriptComponent,
  ],
  providers: [],
  exports: []
})

export class CaseModule {
}
