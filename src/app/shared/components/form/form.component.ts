import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormPropsConfig} from './form.props.config';
import {CommonUtils} from '../../../core/utils/common-utils';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'l-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() columns: FormPropsConfig[] = [];
  @Input() buttons = [];
  @Input() data = {};
  @Input() disabled: boolean = false;
  @Output() getData = new EventEmitter();
  _columns = [];
  config = {};
  _formGroup: FormGroup = new FormGroup({});
  lang = {
    input_placeholder: ''
  };

  constructor(public translateService: TranslateService,
  ) {
    this.setDefaultLang();
  }

  ngOnInit() {
    this._columns = this.columns;
    this.columns.forEach(column => {
      const columnValue = this.data[column.key] === 0 ? 0 : this.data[column.key] || '';
      const $control = new FormControl(columnValue, this.addRuleControl(column.rules), this.addAsyncControl(column.asyncRules));
      this.config[column.key] = true;
      this._formGroup.addControl(column.key, $control);
    });
    console.log(this._formGroup);
    this.translateService.onLangChange
      .subscribe(() => {
        this.setDefaultLang();
      });
  }

  modelChange(controls, event, key) {
    console.log(controls);
    console.log(event);
    console.log(key);
  }

  setDefaultLang() {
    const arr = Object.keys(this.lang);
    this.translateService.get(arr).subscribe(res => {
      this.lang = Object.assign({}, res);
    });
    console.log(this.lang);
  }

  removeItem(key) {
    this.config[key] = false;
    this._formGroup.removeControl(key);
  }

  /**
   * 同步校验controller
   * @param rules
   * @returns {Array}
   */
  private addRuleControl(rules) {
    let control = [];
    if (rules) {
      rules.forEach(rule => {
        let _keys = Object.keys(rule);
        if (_keys.includes('required')) {
          rule.code = 'required';
          rule.msg = rule.msg || '此项为必填项';
          control.push(Validators.required);
        }
        if (_keys.includes('minLength')) {
          rule.code = 'minlength';
          rule.msg = rule.msg || `不能少于${rule.minLength}个字符`;
          control.push(Validators.minLength(rule.minLength));
        }
        if (_keys.includes('maxLength')) {
          rule.code = 'maxlength';
          rule.msg = rule.msg || `不能超过${rule.maxLength}个字符`;
          control.push(Validators.maxLength(rule.maxLength));
        }
        if (_keys.includes('min')) {
          rule.code = 'min';
          rule.msg = rule.msg || `不能小于${rule.min}`;
          control.push(Validators.min(rule.min));
        }
        if (_keys.includes('max')) {
          rule.code = 'max';
          rule.msg = rule.msg || `不能大于${rule.max}`;
          control.push(Validators.max(rule.max));
        }
        if (_keys.includes('email')) {
          rule.code = 'email';
          rule.msg = rule.msg || `邮箱格式有误`;
          control.push(Validators.email);
        }
        if (_keys.includes('pattern')) {
          rule.code = 'pattern';
          rule.msg = rule.msg || '正则验证错误';
          control.push(Validators.pattern(new RegExp(rule.pattern)));
        }
      });
    }
    return control;
  }

  /**
   * 异步检验controller
   * @param rules
   * @returns {Array}
   */
  private addAsyncControl(rules) {
    let control = [];
    if (rules) {
      rules.forEach(rule => {
        control.push(rule.asyncRule);
      });
    }
    return control;
  }

  isString(item) {
    if (typeof item === 'string') {
      return true;
    } else {
      return false;
    }
  }
}
