import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormFactory, FormPropsConfig} from '../../../shared/components/form/form.props.config';

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.scss']
})
export class MyFormComponent implements OnInit {
  @ViewChild('suffix') private suffix: TemplateRef<any>;
  config: FormPropsConfig;
  data = {};
  buttons = [];
  constructor(
    private formFactory: FormFactory
  ) {
  }

  ngOnInit() {

    this.config = this.formFactory.createForm({
      items: [
        {
          label: '限制时间段长度：',
          key: 'limitTime',
          required: true,
          type: 'input',
          rules: [{required: true}, {min: 1}, {max: 999}, {pattern: /^\d+$/, msg: '请输入1-999之间的整数'}],
          suffix: this.suffix,
          modelChange: (controls, event) => {
          }
        },
        {
          label: '限制时间段长度1：',
          key: 'limitTime1',
          type: 'text',
          width: '400px',
        },
        {
          label: '限制时间段长度2：',
          key: 'limitTime2',
          required: true,
          type: 'input',
          rules: [{required: true}, {min: 1}, {max: 999}, {pattern: /^\d+$/, msg: '请输入1-999之间的整数'}],
          width: '500px',
          suffix: this.suffix,
          modelChange: (controls, event) => {
          }
        },
        {
          label: '限制时间段长度2：',
          key: 'radio',
          required: true,
          type: 'radio',
          width: '500px',
          options: [
            {value: 'A', label: 'A'},
            {value: 'B', label: 'B'},
            {value: 'C', label: 'C'},
          ],
          rules: [{required: true}],
          modelChange: (controls, event) => {
          }
        }
      ],
      labelWidth: 148,
      labelAlign: 'left',
    });
    this.buttons = [
      {
        text: '返回',
      },
      {
        text: '提交',
        type: 'primary',
        check: true,
        clickEvent: () => {
          console.log(this.config.formGroup.value);
        }
      }
    ];
    this.data = {
      limitTime: 0,
      limitTime1: 'swqdsqwdhbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbxshabx',
      limitTime2: 4,
      radio: 'A'
    };
  }


  aa() {
    console.log(this.data);
  }
}
