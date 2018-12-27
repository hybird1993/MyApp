import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { RouterModule } from '@angular/router';
import { routes } from './map.routes';
import {SharedModule} from '../../shared/shared.module';
import { FacilityPanelComponent } from './facility-panel/facility-panel.component';
import { LogicAreaComponent } from './logic-area/logic-area.component';
import { FacilityListComponent } from './facility-list/facility-list.component';
import { MyCollectionComponent } from './my-collection/my-collection.component';
import { BMapComponent} from './b-map/b-map.component';
import { GMapComponent } from './g-map/g-map.component';

@NgModule({
  declarations: [
    MapComponent,
    BMapComponent,
    FacilityPanelComponent,
    LogicAreaComponent,
    FacilityListComponent,
    MyCollectionComponent,
    GMapComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class MapModule { }
