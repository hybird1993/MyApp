import {CommonSetting} from "../utils/common-setting";

export class QueryParams {
    pageSize: number = CommonSetting.getTablePageSize();
    pageNum: number = 1;
    sortItem?: string;
    sortWay?: string;
    queryTerm: object = {};
}
