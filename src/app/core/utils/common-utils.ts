/**
 * Created by GyjLoveLh on  2017/12/8
 */
import { FormControl, Validators } from '@angular/forms'
import * as anime from 'animejs';
import jQ from 'jquery';

import { BinaryTreeBalanceImpl, BinaryTreeImpl} from "./data-structure/BinaryTreeImpl";
import {Dictionary, DictionaryImpl} from "./data-structure/Dictionary";
import {BinaryTree} from "./data-structure";
import {LhDelButtonComponent} from "../../shared/lh-entities/lh-del-button";
export class CommonUtils {
    constructor() {
    }

    /**
     * 获取UUID
     * @author Guanyj
     * @returns {string}
     */
    static getUUID(len: number = 36) {
        let uuid = [];
        let str = '0123456789abcdef';
        for (let i = 0; i < len; i++) {
            uuid[i] = str.substr(Math.floor(Math.random() * 0x10), 1);
        }
        if (len === 36) {
            uuid[14] = '4';
            uuid[19] = str.substr((uuid[19] & 0x3 | 0x8), 1)
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        }
        return uuid.join("").replace(/-/g, '');
    }

    /**
     * 初始化表单
     * @author Guanyj
     * @param {boolean} flag
     * @returns {FormControl}
     */
    static initFormControl(flag: boolean = false) {
        if (flag) {
            return new FormControl('', []);
        }
        return new FormControl('', [Validators.required])
    }

    /**
     * 数组删除指定项
     * @param old
     * @param fn
     * @returns {Array}
     * @constructor
     */
    static ArrayRemove(old, fn) {
        let _temp = [];
        old.forEach(item => {
            if (!fn(item)) {
                _temp.push(item);
            }
        });
        return _temp;
    }

    /**
     * 判断用户是否登录
     * @returns {any}
     */
    public static isUserLogin() {
        let _user = localStorage.getItem('__currentUser');
        if (_user) {
            return JSON.parse(_user).user;
        } else {
            return null;
        }
    }

    /**
     * 获取用户的url权限列表
     * @returns {any}
     */
    public static getRoleList() {
        let roleList = localStorage.getItem('roleList');
        if (roleList) {
            return JSON.parse(roleList);
        } else {
            return [];
        }
    }

    /**
     * 注销登录
     */
    public static loginOut() {
        localStorage.removeItem('authorization');
        localStorage.removeItem('__currentUser');
        localStorage.removeItem('roleList');
    }

    /**
     * 获取中英文实际长度
     * @author Guanyj
     * @param {string} str
     * @returns {number}
     */
    public static getRealLength(str: string): number {
        let realLength = 0;
        for (let i = 0; i < str.length; i++) {
            let c = str.charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                realLength++;
            } else {
                realLength += 2;
            }
        }
        return realLength;
    }

    /**
     * 省略超过{len}个字节长度的字符
     * @author Guanyj
     * @param str
     * @returns {string}
     */
    public static getSpliceString(str, len: number = 16) {
        let num = 0, result = '';
        for (let i = 0; i < str.length; i++) {
            let c = str.charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                num++;
            } else {
                num += 2;
            }
            if (num <= len) {
                result += str[i];
            }
        }
        return num <= len ? result : result + '...';
    }

    /**
     * 时间格式化
     * @author Guanyj
     * @param date
     * @param format
     * @returns {any}
     * @constructor
     */
    public static DateFormat(date, format) {
        if (!new Date().hasOwnProperty('format')) {
            Date.prototype['format'] = function (fmt) { // author: meizz
                let o = {
                    "M+": this.getMonth() + 1, // 月份
                    "d+": this.getDate(), // 日
                    "h+": this.getHours(), // 小时
                    "m+": this.getMinutes(), // 分
                    "s+": this.getSeconds(), // 秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
                    "S": this.getMilliseconds() // 毫秒
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (let k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1,
                            (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    }
                }

                return fmt;
            }
        }
        return new Date(date)['format'](format);
    }

    /**
     * 十六进制转RGBA
     * @author Guanyj
     * @param hex
     * @param opacity
     * @returns {string}
     */
    public static hexToRgba(hex, opacity) {
        let rgb = [43, 213, 68]; // #2BD544
        if (/#(..)(..)(..)/g.test(hex)) {
            rgb = [parseInt(RegExp.$1, 16), parseInt(RegExp.$2, 16), parseInt(RegExp.$3, 16)];
        }
        return `rgba(${rgb.join(',')},${opacity})`;
    }


    /**
     * 通用滚动条/菜单定位
     * @author Guanyj
     * @param target
     * @param data
     * @param select
     * @param options : {
     *      duration:  动画持续时间
     *      primaryKey:  数据主键
     *      childKey:  树形展开字段
     *      offsetTopNum:  期望定位元素距离顶层的单元格数
     *      itemHeight: 单位高度
     *      visualItem: 视差
     * }
     */
    public static scrollPosition(target, data, select, options) {
        let _options = {
                duration: 500,
                easing: 'linear',
                primaryKey: null,
                childKey: null,
                offsetTopNum: 4,
                itemHeight: 26,
                visualItem: 0
            };
        if (options) {
            Object.keys(options).forEach(key => {
                _options[key] = options[key];
            });
        }

        if (typeof target === 'string') {
            target = document.getElementById(target);
        }
        let __scrollTop = target.scrollTop, // 上一次操作 离顶部距离
            __viewHeight = target.clientHeight, // 可视高度
            __num = 0,
            __index = -1;
        (function __sum(data, selectId) {
            try {
                data.forEach(item => {
                    // 忽略折叠子网子元素高度, 计入拓扑视图一层高度
                    if (!item.parent) {
                        __num++;
                    } else {
                        if (item.parent.status) {
                            __num++;
                        }
                    }
                    // 目标元素所在数据结构位置
                    if (selectId === item[_options.primaryKey]) {
                        // 记录目标元素父子网未全部展开时的高度
                        __index = __num;
                        (function _parent(item) {
                            if (item.parent) {
                                // if 父层折叠 额外计算高度
                                if (!item.parent.status) {
                                    __index += item.parent[_options.childKey]
                                        .findIndex(node => node[_options.primaryKey] === item[_options.primaryKey]) + 1;
                                }
                                // 递归展开父层子网
                                item.parent.status = true;
                                item.parent.isOpen = true;
                                if (item.parent) {
                                    _parent(item.parent);
                                }
                            }
                        })(item);
                    }
                    if (item[_options.childKey] && item[_options.childKey].length > 0 && item.status) {
                        __sum(item[_options.childKey], selectId);
                    }
                });
            } catch (err) {
                throw new Error(err);
            }
        })(data, select);
        if (__index === -1) {
            return;
        }
        if (!((__index - _options.visualItem) * _options.itemHeight >= __scrollTop && ((__index + _options.visualItem) * _options.itemHeight <= (__scrollTop + __viewHeight)))) {
            let __height = _options.itemHeight * (__index - _options.offsetTopNum); // 期望滚动至高度
            if (__index <= _options.offsetTopNum + 2) {
                anime({
                    targets: target,
                    scrollTop: 0,
                    easing: _options.easing,
                    duration: _options.duration
                });
            } else {
                anime({
                    targets: target,
                    scrollTop: __height,
                    easing: _options.easing,
                    duration: _options.duration
                });
            }
        } else {
            //  定位点已经位于可视范围   不做滚动
        }
    }

    /**
     * 创建面包屑
     * @param crumbs
     * @author Guanyj
     * @param title
     * @returns {{crumbs: any; title: any}}
     */
    public static createConfig(crumbs, title) {
        return {crumbs, title};
    }

    /**
     *str表示原字符串变量，flg表示要插入的字符串，sn表示要插入的位置
     * @param str
     * @param flg
     * @param sn
     * @returns {string}
     */
    public static insert_flg(str, flg, sn) {
        let newstr = "";
        for (let i = 0; i < str.length; i += sn) {
            let tmp = str.substring(i, i + sn);
            newstr += tmp + flg;
        }
        return newstr;

    }

    /**
     * 判断是否为空 返回'';
     * @param obj
     * @returns {any}
     */
    public static isNullRetStr(obj) {
        if (obj === '' || obj === 'null' || obj === 'NA' || obj === null || obj.length === 0) {
            return '';
        } else {
            return obj;
        }

    }

    /**
     * 为空返回[]
     * @param obj
     * @returns {any}
     */
    public static isNullretArry(obj) {
        if (obj === '' || obj === 'null' || obj === 'NA' || obj === null || obj.length === 0) {
            return [];
        } else {
            return obj;
        }

    }

    /**
     * 为空返回'NA'
     * @param obj
     * @returns {any}
     */
    public static isNullRetNA(obj) {
        if (obj === '' || obj === 'null' || obj === 'NA' || obj === null || obj.length === 0) {
            return 'NA';
        } else {
            return obj;
        }
    }

    /**
     * 对象装到数组
     * @param obj
     * @returns {any}
     */
    public static objIntoArray(obj) {
        let arr = [];
        if (this.isNullRetStr(obj) === '') {
            return arr;
        } else {
            if (obj instanceof Array) {
                return obj;
            } else {
                arr.push(obj);
                return arr;
            }
        }

    }

    /**
     * init normal binaryTree
     * @returns {BinaryTree}
     */
    public static getBinaryTree(): BinaryTree {
        return new BinaryTreeImpl();
    }

    /**
     * init balance binaryTree
     * @returns {BinaryTree}
     */
    public static getBinaryTreeBalance(): BinaryTree {
        return new BinaryTreeBalanceImpl();
    }

    /**
     * init dictionary instance
     * @returns {Dictionary}
     */
    public static getDictionary(): Dictionary {
        return new DictionaryImpl();
    }

    static openDeleteModal(config: ModelConfig) {

        let mdSubject = config.modal.open({
            width: '400',
            title:'提示',
            class:"zm-alert",
            content: LhDelButtonComponent,
            componentParams: {
               msg: config.modalMsg
            },
            maskClosable: false,
            onOk: config.onOk
        });

        setTimeout(() => {
            let modalEle = jQ('.ant-modal').get(0);
            let hfHeight = modalEle.offsetHeight / 2;
            modalEle.style.top = 'calc(50% - ' + hfHeight + 'px)';
        }, 0);
    }

    /**
     * key值转换，用于排序    eg: alarmLevel转为alarm_level
     * @param {string} key
     * @returns {string}
     */
    public static keyToLowerCase(key: string) {
        const reg = new RegExp(/[A-Z]/);
        const arr = key.split('');
        let word = [];
        arr.forEach(letter => {
            if (reg.test(letter)) {
                letter = '_' + letter.toLowerCase();
            }
            word.push(letter);
        });
        return word.join('');
    }

    /**
     * 获取正则校验及提示
     */
    public static getPattern() {
        const PATTERN = {
            email: {
                reg: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                msg: '邮箱格式有误'
            },
            username: {
                reg: /^[a-zA-Z0-9\u4e00-\u9fa5\""][a-zA-Z0-9_\-\u4e00-\u9fa5\""]*$/,
                msg: '只能由中文、字母、数字、”-”、”_”组成且不能以”-”、”_”开头'
            },
        }
        return PATTERN;
    }
}

class ModelConfig {
    modal?: any;
    modalMsg?: string;
    onOk?: () => void;
}


