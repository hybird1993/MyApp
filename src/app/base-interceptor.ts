import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  constructor(
    private $router: Router,
    private $message: NzMessageService
  ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(req);
    const token = localStorage.getItem('authorization');
    const lang = localStorage.getItem('lang') || 'zh';
    let authReq;
    if (token) {
       authReq = req.clone({setHeaders: {Authorization: token, lang}});
    } else {
       authReq = req.clone({setHeaders: {lang}});
    }
    // send cloned request with header to the next handler.
    return next.handle(authReq)
      .pipe(
        /*失败时重试2次，可自由设置*/
        retry(2),
        /*捕获响应错误*/
         catchError(this._handleError)
        // catchError((err: HttpErrorResponse) => this.handleError(err))
        // catchError((err: HttpErrorResponse) => this.handleData(err))
      );
  }

  private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
    // 业务处理：一些通用操作
    if (event.status === 401) {
      this.$router.navigate(['/login'], {}).then(() => {});
    } else {
    }
    return of(event);
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      if (error.status === 401) {
        this.$router.navigate(['/login'], {}).then(() => {});
      }
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  private _handleError = (error: HttpErrorResponse) => {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      if (error.status === 401) {
        this.$message.remove();
        this.$router.navigate(['/login'], {}).then(() => {});
      }
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
