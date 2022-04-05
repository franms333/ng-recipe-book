import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

// ESTE "Auth Feature Module" NOS PERMITE SEPARAR EL FUNCIONAMIENTO DEL "authentication" DE NUESTRA APP
// PARA LUEGO IMPORTARLO DENTRO DEL ARCHIVO "app.module.ts"

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    // SE USA PARA PODER USAR LOS OPERADORES DE "ngIf y ngFor" EN CASO DE NO TENERLO, LA APP
    // DARÁ ERROR AL MOMENTO DE TRABAJAR CON VARIOS MODULES
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      // {path: 'auth', component: AuthComponent}
      {path: '', component: AuthComponent}
    ]),
    // SE INCORPORÓ EL "SharedModule" YA QUE SIN ÉL NO SE PODRÍA VER EL LOADING SPINNER
    SharedModule
  ]
})
export class AuthModule { }
