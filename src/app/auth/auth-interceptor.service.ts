import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { exhaustMap, map, take } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';


@Injectable()

// LO QUE ESTAMOS HACIENDO AQUÍ ES LA MISMA LÓGICA QUE HICIMOS PARA EL CASO DE LA FUNCIÓN "fetchRecipes()"
// EN EL SERVICIO "data-storage.service.ts" SOLO QUE ESTA VEZ USANDO INTERCEPTORS EN LUGAR QUE COLOCANDOLO
// DENTRO DE LA MISMA FUNCIÓN DE "storeRecipes()"

// PARA PODER USAR INTERCEPTORS NECESITAMOS:
// 1.- IMPORTAR LA INTERFAZ "HttpInterceptor"
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService: AuthService, private store: Store<fromApp.AppState>){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // ESTO FUE COMENTADO PARA USAR "ngrx"
        // return this.authService.userSubject.pipe(

        // ESTA ES LA SOLUCIÓN USANDO "ngrx"
        return this.store.select('auth').pipe(
            take(1),
            // ESTE PASO USANDO "map" LO USAMO ÚNICAMENTE PARA EL CASO DE "ngrx" YA QUE AQUÍ
            // EL "map" NOS RETORNA EL "user" QUE ENTRA POR EL "State" DE "fromApp"
            map(authState => {
                return authState.user;
            }),
            // SI NO QUEREMOS USAR "ngrx" SOLO HAY QUE COMENTAR LAS LÍNEAS DEL "map"
            exhaustMap(user => {
                if(!user){
                    return next.handle(req);
                }
                const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
                return next.handle(modifiedReq);
            }))        
    }
}