import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    CanActivateChild,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/shared/storage.service';

@Injectable()
export class AuthGuard implements CanActivateChild {
    constructor(private router: Router, private storage: StorageService) {}
    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const token = !!this.storage.getItem('token');
        const tokenFromData = route.data.token;
        if (token === tokenFromData) {
            return true;
        }

        this.router.navigate(['/user/login']);
        return false;
    }
}
