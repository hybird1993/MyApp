export class FormEvent {
  /**
   * 获取表单
   */
  getFormGroup ?: () => any;
  /**
   * 获取表单值
   */
  getData ?: () => any;
  /**
   * 获取表单输入值是否正确
   */
  getFormValid ?: () => boolean;
}

export class FormPropsConfig extends FormEvent {
  labelWidth?: string | number;
  labelAlign?: string;
  items?: FormItemConfig[];
}

export class FormItemOperation {
  disabled?: boolean;
  constructor() {
    this.disabled = false;
  }
}

export class FormItemConfig extends FormItemOperation {
  key: string;   // key
  label?: string;  // 左侧label文本
  required?: boolean; // 是否必填（必填则出现*标识）
  type: string;  // 类型  input
  labelStyle?: object;
  removeLabel?: boolean = false; //   去除label
  width?: string | number;
  rules?: any;
  prefixTemplate?: any;
  asyncRules?: any;
  suffix?: any;
  modelChange?: any;
  placeholder?: string;
  labelMsg?: string;
  inputWith?: string;  // 输入框宽度
  hidden?: boolean = false;
  options?: any;
}

export class FormPropsConfigImpl extends FormPropsConfig {
  constructor(config?: FormPropsConfig) {
    super();
    if (!!config) {
      console.log(config)
      Object.keys(config).forEach(key => {
        if (key === 'items') {
          let items = [];
          console.log(config[key])
          config[key].forEach(item => {
            console.log(item)
            console.log(item instanceof FormItemConfig)
            items.push(item);
            // TODO
            // if (item instanceof FormItemConfig) {
            //   items.push(item);
            // } else {
            //   items.push(new FormItemConfigImpl());
            // }
          });
          console.log(items)
          config[key] = items;
        }
        this[key] = config[key];
      });
    }
  }
}

export class FormItemConfigImpl extends FormItemConfig {
  constructor(config?: FormItemConfig) {
    super();
    if (!!config) {
      Object.keys(config).forEach(key => {
        this[key] = config[key];
      });
    }
  }
}


/**
 * form factory. 生产表单配置和条目配置
 */
export class FormFactory {
  createForm(config?: FormPropsConfig): FormPropsConfig {
    return new FormPropsConfigImpl(config);
  }

  createFormItem(config?: FormItemConfig): FormItemConfig {
    return new FormItemConfigImpl(config);
  }
}


class Options {
  value: string | number;
  label?: string = '';
  disabled: boolean = false;
}

