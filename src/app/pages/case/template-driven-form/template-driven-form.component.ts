import { Component, OnInit } from '@angular/core';
import {User} from './template-driven-form.interface';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent implements OnInit {
  public user: User = {
    name: '122',
    account: {
      email: '',
      confirm: ''
    }
  };
  JSON = JSON;
  constructor() { }

  ngOnInit() {
  }

  onSubmit(f) {
    // { value, valid }: { value: User, valid: boolean }
    // console.log(value, valid);
    console.log(f);
  }
}
