import {Routes} from '@angular/router';
import {CaseComponent} from './case.component';
import {ReactiveFormComponent} from './reactive-form';
import {TemplateDrivenFormComponent} from './template-driven-form';
import {MyFormComponent} from './my-form';
import {RxjsComponent} from './rxjs/rxjs.component';
import {MarkerMapComponent} from '../map/marker-map/marker-map.component';
import {TypescriptComponent} from './typescript/typescript.component';
import {LodashComponent} from './lodash/lodash.component';
import {LifeCircleComponent} from './life-circle/life-circle.component';
import {PipeComponent} from './pipe/pipe.component';
// import {QuneeComponent} from './qunee/qunee.component';

export const routes: Routes = [
  {
    path: '',
    component: CaseComponent,
  },
  {
    path: 'reactive-form',
    component: ReactiveFormComponent
  },
  {
    path: 'template-driven-form',
    component: TemplateDrivenFormComponent
  },
  {
    path: 'my-form',
    component: MyFormComponent
  },
  {
    path: 'rxjs',
    component: RxjsComponent
  },
  {
    path: 'typescript',
    component: TypescriptComponent
  },
  // {
  //   path: 'qunee',
  //   component: QuneeComponent
  // },
  {
    path: 'lodash',
    component: LodashComponent
  },
  {
    path: 'life-circle',
    component: LifeCircleComponent,
  },
  {
    path: 'pipe',
    component: PipeComponent,
  }
];
