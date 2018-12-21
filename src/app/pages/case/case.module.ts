import {NgModule} from '@angular/core';
import {CaseComponent} from './case.component';
import {RouterModule} from '@angular/router';
import {routes} from './case.routes';
import {SharedModule} from '../../shared/shared.module';
import { TemplateDrivenFormComponent } from './template-driven-form';
import { ReactiveFormComponent } from './reactive-form';
import { MyFormComponent } from './my-form';
import { RxjsComponent } from './rxjs/rxjs.component';
import { TypescriptComponent } from './typescript/typescript.component';
import { LodashComponent } from './lodash/lodash.component';
import { LifeCircleComponent } from './life-circle/life-circle.component';
import { PipeComponent } from './pipe/pipe.component';
import { ChildComponent } from './life-circle/child/child.component';
import { QuneeComponent } from './qunee/qunee.component';
import { VisjsComponent } from './visjs/visjs.component';

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
    QuneeComponent,
    TypescriptComponent,
    LodashComponent,
    LifeCircleComponent,
    PipeComponent,
    ChildComponent,
    QuneeComponent,
    VisjsComponent,
  ],
  providers: [],
  exports: []
})

export class CaseModule {
}
