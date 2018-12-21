import {Routes} from '@angular/router';
import {MapComponent} from './map.component';
import {MarkerMapComponent} from './marker-map/marker-map.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/pages/map/marker-map',
    component: MapComponent
  },
  {
    path: 'marker-map',
    component: MarkerMapComponent
  }
];

