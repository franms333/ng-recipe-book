import { Injectable } from '@angular/core';

// ESTA ES SOLO UNA PRUEBA DE CÓMO FUNCIONA AGREGAR LOS SERVICIOS EN LOS DIFERENTES NIVELES DE LA APP
// 1.- APP COMPONENTE
// 2.- COMPONENTE DONDE SERÁ USADO
// 3.- EAGER COMPONENTES: COMPONENTES DONDE NO SE USA LAZY LOADING
// 4.- LAZY LOAD COMPONENTS

@Injectable(
  {
  providedIn: 'root'
  }
)
export class LoggingService {
  lastlog: string;

  constructor() { }

  printLog(message: string){
    console.log(message);
    console.log(this.lastlog);
    this.lastlog = message;
  }
}
