import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../core/service/user-service/user.service';

@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.scss']
})
export class HttpComponent implements OnInit {

  constructor(
    private $service: UserService,
  ) { }

  ngOnInit() {
  }

  getData() {
    this.$service.getUsersList().then(result => {
      console.log(result);
    });
  }
}
