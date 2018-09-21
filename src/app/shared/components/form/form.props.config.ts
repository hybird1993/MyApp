export class FormPropsConfig {
  key: string;   // key
  label?: string;  // 左侧label文本
  required?: boolean; // 是否必填（必填则出现*标识）
  type: string;  // 类型  input
  labelStyle: Object;
  width?: string | number;
  rules: any;
  asyncRules: any;
  suffix: any;
  modelChange: any;
  placeholder?: string;
  labelMsg?: string;
  hidden?: boolean = false;
  options?: Options;
}

class Options {
  value: string | number;
  label?: string = '';
  disabled: boolean = false;
}
