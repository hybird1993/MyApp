/**
 * Created by GyjLoveLh on  2017/12/6
 */
export interface Result<T> {
    /**
     * result-code
     */
    code: number | string;
    /**
     * result - data
     */
    data: T;
    /**
     * result - msg
     */
    msg?: string;
}

export interface EntitiesResult<T> {
    /**
     * entities result - pageNum
     */
    pageNum: number;
    /**
     * page size
     */
    size: number;
    /**
     * data's length
     */
    totalCount: number;
    /**
     * total page count
     */
    totalPage: number;
    /**
     * data with declare
     */
    data: T[];
}
