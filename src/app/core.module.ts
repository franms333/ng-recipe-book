import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

// DENTRO DEL "core.module.ts" SE SUPONE PONDREMOS LOS SERVICIOS QUE INCORPOREMOS DENTRO DE LA PROPIEDAD
// "providers" DEL "app.module.ts", CON EL OBJETIVO DE HACER MÁS PROLIJO DICHO ARCHIVO
// OJO: SI ESTAMOS USANDO EL "providedIn:{'root'}" EN NUESTROS SERVICIOS, ESTO NO ES NECESARIO, SIN EMBARGO
// PARA EL CASO DE LOS "INTERCEPTORS", SI ES NECESARIO, YA QUE ESTOS TIENE QUE OBLIGATORIAMENTE SER
// DECLARADOS EN LA PROPIEDAD "providers" DEL ARCHIVO "app.module.ts"

@NgModule({
  declarations: [],

  // LOS SERVICIOS NO NECESITAN SER EXPORTADOS, SOLO LOS "declarations" NECESITAN SER EXPORTADOS
  providers: [
    {provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptorService, 
    multi:true}
  ],  
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
