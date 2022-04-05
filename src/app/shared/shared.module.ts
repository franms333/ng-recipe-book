import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';

// LOS SHARED MODULES NOS AYUDAN A IGUALAR EL USO DE COMPONENTES, DIRECTIVES O PIPES QUE SE USEN
// DE FORMA COMÚN ENTRE VARIOS MODULES DE NUESTRA APLICACIÓN. PARA PODER USARLOS ES NECESARIO:
// 1.- COLOCAR EN LA PROPIEDAD "declarations" LOS COMPONENTES Y DIRECTIVES QUE SERAN USADOS
// 2.- COLOCAR EN LA PROPIEDAD "imports" EL "CommonModule" PARA UNIFICAR TODOS LOS DEMÁS MÓDULOS
// 3.- EXPORTAR TODOS LOS "declarations" Y EL "CommonModule"
// 4.- IMPORTAR EL NUEVO ARCHIVO DE "sharedModules" CREADO EN CADA UNO DE LOS MODULES INCLUYENDO EL 
// "app.module.ts"
// ES PROBABLE QUE SE GENERE UN ERROR "NG6002" AL MOMENTO DE GUARDAR Y HACER TODO ESTO, PARA ESO ES NECESARIO
// REINICIAR EL SERVER, YA QUE PROBABLEMENTE EL NUEVO MODULE NO HA SIDO CARGADO POR EL SERVER DE ANGULAR
// USANDO "sharedModules" PUDIMOS RESOLVER EL PROBLEMA QUE DABA EL "dropdownDirective.directive.ts"
// ENTRE EL BOTÓN DE "manage" Y EL BOTÓN DE "administrar recetas" AL MOMENTO DE DARLE CLICK AL SEGUNDO

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports: [
    // SE USA PARA PODER USAR LOS OPERADORES DE "ngIf y ngFor" EN CASO DE NO TENERLO, LA APP
    // DARÁ ERROR AL MOMENTO DE TRABAJAR CON VARIOS MODULES
    CommonModule
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    // SE USA PARA PODER USAR LOS OPERADORES DE "ngIf y ngFor" EN CASO DE NO TENERLO, LA APP
    // DARÁ ERROR AL MOMENTO DE TRABAJAR CON VARIOS MODULES
    CommonModule
  ]
})
export class SharedModule { }
