import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { MarkerMapComponent} from './marker-map/marker-map.component';
import { RouterModule } from '@angular/router';
import { routes } from './map.routes';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    MapComponent,
    MarkerMapComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class MapModule { }
