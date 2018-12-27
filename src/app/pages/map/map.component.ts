import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  isBMap;
  isGMap;
  constructor(
    $router: Router
  ) { }

  ngOnInit() {
    this.isBMap = localStorage.getItem('isBMap') === 'true';
    this.isGMap = !this.isBMap;
  }

}
