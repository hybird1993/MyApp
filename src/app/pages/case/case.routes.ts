import {Routes} from '@angular/router';
import {CaseComponent} from './case.component';
import {ReactiveFormComponent} from './reactive-form';
import {TemplateDrivenFormComponent} from './template-driven-form';
import {MyFormComponent} from './my-form';
import {RxjsComponent} from './rxjs/rxjs.component';
import {HttpComponent} from './http/http.component';
import {MarkerMapComponent} from './marker-map/marker-map.component';
import {TypescriptComponent} from './typescript/typescript.component';
import {LodashComponent} from './lodash/lodash.component';
import {LifeCircleComponent} from './life-circle/life-circle.component';
import {PipeComponent} from './pipe/pipe.component';

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
    path: 'http',
    component: HttpComponent
  },
  {
    path: 'marker-map',
    component: MarkerMapComponent
  },
  {
    path: 'typescript',
    component: TypescriptComponent
  },
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
