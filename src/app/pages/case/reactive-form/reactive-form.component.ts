import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  user: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // this.user = new FormGroup({
    //   name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    //   account: new FormGroup({
    //     email: new FormControl('', [Validators.required]),
    //     confirm: new FormControl('', [Validators.required])
    //   })
    // });

    this.user = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      account: this.fb.group({
        email: ['', Validators.required],
        confirm: ['', Validators.required]
      })
    });
  }

  onSubmit(user) {
    console.log(user);
  }

}

export interface User {
  name: string;
  account: {
    email: string;
    confirm: string;
  };
}
