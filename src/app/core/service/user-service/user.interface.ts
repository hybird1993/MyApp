import {Result} from '../Result';
import {User} from '../../models/user';

export  interface  UserInterface {
  /**
   * 获取用户列表
   * @returns {Promise<Result<any>>}
   */
  getUsersList(): Promise<Result<any>>;

  /**
   * 登录
   * @param name   用户名
   * @param password   密码
   * @returns {Promise<Result<any>>}
   */
  login(name: string, password: string): Promise<Result<any>>;

  /**
   * 注册
   * @param {User} params
   * @returns {Promise<Result<any>>}
   */
  register(params: User): Promise<Result<any>>;

  /**
   * 检查用户是否存在
   * @param {string} username
   * @returns {Promise<Result<any>>}
   */
  checkUserExist(username: string): Promise<Result<any>>;

  /**
   * 退出登录
   * @returns {Promise<Result<any>>}
   */
  loginOut(): Promise<Result<any>>;

  /**
   * 修改资料
   * @param {User} params
   * @returns {Promise<Result<any>>}
   */

  modify(params: User): Promise<Result<any>>;
}
