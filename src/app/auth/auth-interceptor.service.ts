import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs/operators";

@Injectable()

// LO QUE ESTAMOS HACIENDO AQUÍ ES LA MISMA LÓGICA QUE HICIMOS PARA EL CASO DE LA FUNCIÓN "fetchRecipes()"
// EN EL SERVICIO "data-storage.service.ts" SOLO QUE ESTA VEZ USANDO INTERCEPTORS EN LUGAR QUE COLOCANDOLO
// DENTRO DE LA MISMA FUNCIÓN DE "storeRecipes()"

// PARA PODER USAR INTERCEPTORS NECESITAMOS:
// 1.- IMPORTAR LA INTERFAZ "HttpInterceptor"
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService: AuthService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.userSubject.pipe(
            take(1),
            exhaustMap(user => {
                if(!user){
                    return next.handle(req);
                }
                const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
                return next.handle(modifiedReq);
            }))        
    }
}