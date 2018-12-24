import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.scss']
})
export class FacilityListComponent implements OnInit {
  @Input() id: boolean;
  constructor() { }

  ngOnInit() {
  }

}
