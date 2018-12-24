import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { MarkerMapComponent} from './marker-map/marker-map.component';
import { RouterModule } from '@angular/router';
import { routes } from './map.routes';
import {SharedModule} from '../../shared/shared.module';
import { FacilityPanelComponent } from './facility-panel/facility-panel.component';
import { LogicAreaComponent } from './logic-area/logic-area.component';
import { FacilityListComponent } from './facility-list/facility-list.component';
import { MyCollectionComponent } from './my-collection/my-collection.component';

@NgModule({
  declarations: [
    MapComponent,
    MarkerMapComponent,
    FacilityPanelComponent,
    LogicAreaComponent,
    FacilityListComponent,
    MyCollectionComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class MapModule { }
