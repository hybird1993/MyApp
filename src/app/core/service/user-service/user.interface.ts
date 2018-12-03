import {EntitiesResult, Result} from '../Result';
import {User} from '../../models/user';
import {QueryParams} from '../QueryParams';

export  interface  UserInterface {
  /**
   * 获取用户列表
   * @param {QueryParams} params
   * @returns {Promise<Result<EntitiesResult<any>>>}
   */
  getUsersList(params: QueryParams): Promise<Result<EntitiesResult<User>>>;

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

  /**
   * 获取用户信息
   * @returns {Promise<Result<any>>}
   */
  getUserInfo(): Promise<Result<any>>;

  /**
   * 删除用户
   * @param {string | number[]} ids
   * @returns {Promise<Result<any>>}
   */
  deleteUsers(ids: string | number[]): Promise<Result<any>>;

  /**
   * 修改密码
   * @param {string} oldPwd
   * @param {string} newPwd
   * @returns {Promise<Result<any>>}
   */
  modifyPassword(oldPwd: string, newPwd: string): Promise<Result<any>>;

  /**
   * 重置密码
   * @param {number} id
   * @param {string} password
   * @returns {Promise<Result<any>>}
   */
  resetPassword(id: number, password: string): Promise<Result<any>>;
}
