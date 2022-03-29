// ESTE SERVICIO SERÁ EL ENCARGADO DE MANEJAR EL REGISTRO E INGRESO DE USUARIOS
// TAMBIÉN SERÁ EL ENCARGADO DE ENCAPSULAR LOS TOKENS DE LOS USUARIOS QUE INGRESEN
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import { User } from './user.model';

// ESTA INTERFAZ LA CREAMOS PARA PODER ESPECIFICAR CÓMO QUEREMOS QUE LA RESPUESTA DEL SERVIDOR SE VEA
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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // DE ESTA MANERA NOS TRAEMOS EL CONTENIDO DEL MODELO "user.model.ts"
  userSubject = new BehaviorSubject<User>(null);// DE ESTA MANERA PODEMOS ACCEDER AL TOKEN PARA PODER USARLO EN LAS FUNCIONES DEL SERVICIO
                                    // "data-storage.service.ts"
                                    // "BehaviorSubject" ES IGUAL A "Subject" PERO SE DIFERENCIA EN QUE TAMBIÉN OTORGA INFORMACIÓN
                                    // SOBRE EL STATUS PREVIO EMITIDO A PESAR DE NO HABERSE SUSCRIPTO AUN
                                    // SE DEBE INICIALIZAR CON "(null)" O CON CUALQUIER OTRO VALOR

  

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string){
    // EN EL LUGAR DONDE DICE "key=[API_KEY]" DEBEMOS PONER EL API DE FIREBASE PARA ESTE CASO
    // this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]')
    // "post<AuthResponseData>" NOS PERMITE ESPECIFICAR QUÉ TIPO DE RESPUESTA Y CÓMO SE VERÁ LA RESPUESTA
    // QUE NOS DEVUELVA EL SERVIDOR
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtzhwUAvUBlXpzUScSxOQbEY0R1WN2sxY',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handlerError)
      // EL OPERADOR "tap()" QUE NOS PERMITE CORRER UNA LÓGICA PERO NO INTERRUMPE O CAMBIA LA RESPUESTA
      // DEL SERVER
    ,tap(responseData => {
      this.handleAuthentication(responseData.email, 
                                responseData.localId, 
                                responseData.idToken,
                                +responseData.expiresIn, 
                                )
    }));
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBtzhwUAvUBlXpzUScSxOQbEY0R1WN2sxY',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handlerError)
    ,tap(responseData => {
      this.handleAuthentication(responseData.email, 
                                responseData.localId, 
                                responseData.idToken,
                                +responseData.expiresIn, 
                                )
    }))
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      
    const user = new User(email, userId, token, expirationDate);

    this.userSubject.next(user);
  }

  // ESTO LO HACEMOS PARA UNIFICAR LOS MENSAJES DE ERROR QUE SALEN ENTRE EL LOGIN Y LE SIGNUP
  private handlerError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error ocurred!';
      if (!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
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
      return throwError(errorMessage);
  }
}


