import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService,
                 private router: Router,
                 private store: Store<fromApp.AppState>){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        // ESTO FUE COMENTADO PARA USAR "ngrx"
        // return this.authService.userSubject.pipe(take(1),map(user => {

        // ESTA ES LA SOLUCIÓN USANDO "ngrx"
        return this.store.select('auth').pipe(
            take(1),
            // ESTE PASO USANDO "map" LO USAMO ÚNICAMENTE PARA EL CASO DE "ngrx" YA QUE AQUÍ
            // EL "map" NOS RETORNA EL "user" QUE ENTRA POR EL "State" DE "fromApp"
                map(authState => {
                    return authState.user;
                }),
                 // SI NO QUEREMOS USAR "ngrx" SOLO HAY QUE COMENTAR LAS LÍNEAS DEL "map" DE ARRIBA
                    map(user => {
                        const isAuth = !!user;
                        if(isAuth){
                            return true;
                        } else {
                            return this.router.createUrlTree(['/auth']);
                        }          
        }));
    }
}