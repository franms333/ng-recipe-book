import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

import * as AuthActions from '../store/auth.actions';
import { User } from '../user.model';

// ESTA INTERFAZ LA CREAMOS PARA PODER ESPECIFICAR CÓMO QUEREMOS QUE LA RESPUESTA DEL SERVIDOR SE VEA
// LA TRAJIMOS DEL ARCHIVO "auth.service.ts" PARA PODER IMPLEMENTARLA EN EL EFFECT
export interface AuthResponseData {
    // TODAS ESTAS PROPIEDADES ESTAN EN LA SECCIÓN "Response Payload" DE FIREBASE
    // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user))
    return (new AuthActions.AuthenticateSuccess({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expirationDate,
        redirect: true
    }))
};

const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error ocurred!';
                if (!errorRes.error || !errorRes.error.error){
                    return of(new AuthActions.AuthenticateFail(errorMessage));
                }
                switch(errorRes.error.error.message){
                    case 'EMAIL_EXISTS':
                    errorMessage = 'This e-mail already exists.';
                    break;
                    case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This e-mail does not exists.';
                    break;
                    case 'INVALID_PASSWORD':
                    errorMessage = 'This password is not correct.';
                    break;
                }
                return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable({
    providedIn: 'root'
})

// ESTOS "Actions" SON DISTINTOS A LA INTERFAZ "Action" QUE SOLEMOS IMPLEMENTAR AL MOMENTO DE USAR "ngrx"
export class AuthEffects {

    // POR CONVENCIÓN, LA VARIABLE LOCAL EN EL CONSTRUCTOR SE LLAMA "actions$"
    // Actions:  ES UN OBSERVABLE QUE NOS DA ACCESO A TODAS LAS ACCIONES "dispatched" EN NUESTRA APP
    // SIN NECESIDAD DE CAMBIAR EL STATE
    constructor(private actions$: Actions, 
        private http: HttpClient,
        private router: Router,
        private authService: AuthService){}

    // ESTO SE ENCARGA AHORA DEL SIGNUP
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            {
                email: signupAction.payload.email,
                password: signupAction.payload.password,
                returnSecureToken: true
            }).pipe(
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                return handleAuthentication(
                    +resData.expiresIn, 
                    resData.email, 
                    resData.localId, 
                    resData.idToken);
                }),
                catchError(errorRes => {
                return handleError(errorRes);
            }))
        }),
    )

    // ESTO SE ENCARGA AHORA DEL LOGIN
    @Effect()
    // ESTE SERÁ NUESTRO PRIMER EFFECT
    // NO ES NECESARIO SUSCRIBIRNOS, YA QUE "ngrx/effects" LO HARÁ AUTOMÁTICAMENTE
    authLogin = this.actions$.pipe(
        // "ofType" PERMITE ENCONTRAR UN FILTRO PARA CUÁLES TIPOS DE EFFECTS QUEREMOS CONTINUAR EN ESTE
        // OBSERVABLE, EN ESTE CASO ESCOGEREMOS EL ACTION "Login"
        ofType(AuthActions.LOGIN_START),
        // "switchMap" NOS PERMITE CREAR UN NUEVO OBSERVABLE TOMANDO OTRO OBSERBABLE
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,{
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
            }).pipe(
                    tap(resData => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    }),
                        map(resData => {
                        return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken)
                        }),
                        catchError(errorRes => {
                        return handleError(errorRes);
            }))
        })
    );

    // ESTO SE ENCARGA DE REDIRECCIONAR AL USUARIO 
    // ESTE ES UN EFFECT QUE NO DEVUELVE NI CAMBIA NADA, SOLAMENTE NAVEGA, POR LO TANTO EN ESTOS CASOS
    // HAY QUE PONER DENTRO DE "@Effect()" UN OBJETO COMO PARÁMETRO QUE SEA "{dispatch: false}"
    @Effect({dispatch: false})
    authRedirect = this.actions$
    .pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS)
            , tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
                if(authSuccessAction.payload.redirect){
                    this.router.navigate(['/'])
                }                
            })
        );


    // ESTO SE ENCARGA DEL AUTOLOGIN
    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string;
                id: string;
                _token: string;
                _tokenExpirationDate: string;
              } = JSON.parse(localStorage.getItem('userData'));
              if(!userData){
                return {type: 'DUMMY'};
              } 
          
              const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
              if(loadedUser.token){
          
                // ESTO FUE COMENTADO YA QUE AHORA SE HARÁ EL APROXIMAMIENTO USANDO "ngrx"
                // this.userSubject.next(loadedUser);
                
                const expirationDuration = new Date (userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);

                // ESTE ES EL ACERCAMIENTO USANDO "ngrx"
                return new AuthActions.AuthenticateSuccess({
                    email: loadedUser.email,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData._tokenExpirationDate),
                    redirect: false
                  })
          
                // const expirationDuration = new Date (userData._tokenExpirationDate).getTime() - new Date().getTime();
                // this.autoLogout(expirationDuration);
              }

              return {type: 'DUMMY'};
        })
    )

    // ESTO SE ENCARGA DE LIMPIAR EL "localstorage" CUANDO EL USUARIO HACE CLICK EN "logout"
    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), tap(() => {
        this.authService.clearLogoutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['auth']);
    }));
    
}