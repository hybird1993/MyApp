import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {
  constructor(
    private $router: Router
  ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const auth = localStorage.getItem('auth');
      if (!auth) {
        this.$router.navigate(['/login'], {}).then(() => {});
      }
      return true;
  }
}
