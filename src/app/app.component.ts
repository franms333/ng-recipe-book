import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService, 
              private store: Store<fromApp.AppState>,

              // EL DECORATOR "@Inject" PERMITE OBTENER EL VALOR GLOBAL DE LA PLATAFORMA EN LA CUAL
              // ESTÁ CORRIENDO LA APP (ya sea "browser" o "server")
              @Inject(PLATFORM_ID) private platformId){

  }

  ngOnInit(): void {
    // SE COMENTÓ PARA USAR "ngrx"
    // this.authService.autoLogin();

    // LA FUNCIÓN "isPlatformBrowser(this.platformId)" VERIFICARÁ SI LA APP ESTÁ CORRIENDO O NO EN EL SERVER
    // DE ESTA MANERA EVITAMOS QUE SE DEN ERRORES AL MOMENTO DE CORRER LA APP EN EL LADO DEL SERVER
    // Y OCURRA UN ERROR AL HACER "AutoLogin()" POR USAR "localstorage" QUE NO EXISTE EN EL SERVER SIDE
    if(isPlatformBrowser(this.platformId)){
      this.store.dispatch(new AuthActions.AutoLogin());
    }
  }
}
