export class CommonUtils {
  constructor() {
  }

  /**
   * 获取正则校验及提示
   */
  public static getPattern() {
    const PATTERN = {
      number: {
        reg: /^d+$/,
        msg: '请输入正整数'
      },
      email: {
        reg: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        msg: '邮箱格式有误'
      },
      username: {
        reg: /^[a-zA-Z0-9\u4e00-\u9fa5\""][a-zA-Z0-9_\-\u4e00-\u9fa5\""]*$/,
        msg: '只能由中文、字母、数字、”-”、”_”组成且不能以”-”、”_”开头'
      },
    };
    return PATTERN;
  }

  /**
   *获取字符串unicode编码
   */
  public static getUnicode(string) {
    let str = '';
    for (let s of string) {
      str += '\\u' + s.codePointAt(0).toString(16).padStart(4, 0);
    }
    return str;
  }

  /**
   * 日期格式化
   * @param fmt
   * @param date
   * @returns {any}
   */
  public static dateFormat(fmt, date) {
    const o = {
      'M+': date.getMonth() + 1,                 // 月份
      'd+': date.getDate(),                    // 日
      'h+': date.getHours(),                   // 小时
      'm+': date.getMinutes(),                 // 分
      's+': date.getSeconds(),                 // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds()             // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }

    return fmt;
  }

  /**
   * 类型判断
   * @param data
   * @returns {string}
   */
  private static isPrototype(data) {
    return Object.prototype.toString.call(data).toLowerCase();
  }

  public static isArray(data) {
    return this.isPrototype(data) === '[object array]';
  }

  public static isJSON(data) {
    return this.isPrototype(data) === '[object object]';
  }

  public static isFunction(data) {
    return this.isPrototype(data) === '[object function]';
  }

  public static isString(data) {
    return this.isPrototype(data) === '[object string]';
  }

  public static isNumber(data) {
    return this.isPrototype(data) === '[object number]';
  }

  public static isUndefined(data) {
    return this.isPrototype(data) === '[object undefined]';
  }

  public static isNull(data) {
    return this.isPrototype(data) === '[object null]';
  }
}




