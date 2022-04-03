import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static:false}) alertHost: PlaceholderDirective;
  private closeSubscription: Subscription;

  // "ComponentFactoryResolver" NOS PERMITE CREAR COMPONENTES DINAMICAMENTE SIN INYECTARLOS EN EL TEMPLATE
  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // if(this.closeSubscription){
    //   this.closeSubscription.unsubscribe();
    // }
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm){
    // DE ESTA MANERA MANEJAMOS QUE ESTE BOTÓN NO HAGA NADA SI NO SE HA COMPLETADO CORRECTAMENTE EL FORM
    if(!authForm.valid){
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    // DE ESTA MANERA ENCAPSULAMOS 1 SOLO OBSERVABLE Y NO LO REPETIMOS EN AMBOS CASOS DEL IF/ELSE
    let authObs: Observable<AuthResponseData>;    

    // AQUÍ MOSTRAMOS EL LOADING SPINNER
    this.isLoading = true

    // ESTE ES EL CASO PARA EL LOGIN
    if(this.isLoginMode){
      authObs = this.authService.login(email, password);
      // ESTE ES EL CASO PARA EL SIGN UP
    } else {
      authObs = this.authService.signUp(email, password);
    }    

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        console.log(errorMessage);          
      }
    )

    authForm.reset();
  }

  // DE ESTA MANERA LOGRAMOS REINICIAR LA VARIABLE "error" PARA QUE NO SIGA SALIENDO EN EL TEMPLATE
  onHandleError(){
    this.error = null;
  }

  // DE ESTA MANERA CREAMOS DINAMICAMENTE NUESTRO COMPONENTE "alert"
  private showErrorAlert(message: string){
    // EL MÉTODO "resolveComponentFactory()" PIDE EL TIPO DEL COMPONENTE QUE QUEREMOS AGREGAR, EN ESTE
    // CASO ES "AlertComponent"
    // ESTA VARIABLE "alertComponentFactory" CONTENDRÁ EL COMPONENTE QUE QUEREMOS CREAR DINÁMICAMENTE
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    // ESTA VARIABLE "hostViewConteinerRef" CONTENDRÁ EL DIRECTIVE QUE CREAMOS Y QUE NOS PERMITE ACCEDER
    // A UN PUNTO EN ESPECÍFICO DEL TEMPLATE PARA INTERACTUAR
    const hostViewConteinerRef = this.alertHost.viewContainerRef;

    // EL MÉTODO "clear()" LIMPIA TODAS LAS VISTAS DENTRO DEL CONTENEDOR DEL DIRECTIVE 
    hostViewConteinerRef.clear();

    // ASÍ SE CREA UN COMPONENTE DE FORMA DINÁMICA
    const componentRef = hostViewConteinerRef.createComponent(alertComponentFactory);

    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe(()=> {
      this.closeSubscription.unsubscribe();
      hostViewConteinerRef.clear();
    });
  }

}
