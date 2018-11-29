export class User {
  id?: string | number;  // 用户id
  name: string; // 用户名
  password?: string; // 密码
  nickname?: string; // 昵称
  email?: string; // 邮箱
  icon?: string; // 头像
  create_time?: string;   // 创建时间
  modified_time?: string;  // 修改时间
  age?: number;  // 年龄
  privilege_level?: number;   // 权限级别
  detail_info?: string;   // 详情
  [propName: string]: any;   // 额外的属性
}
