import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { //AuthResponseData, <- FUE COMENTADO YA QUE CON EL USO DE "ngrx" YA NO SE USA ESTA INTERFAZ
  AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';

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
  private storeSub: Subscription;

  // "ComponentFactoryResolver" NOS PERMITE CREAR COMPONENTES DINAMICAMENTE SIN INYECTARLOS EN EL TEMPLATE
  constructor(private authService: AuthService, 
              private router: Router, 
              private componentFactoryResolver: ComponentFactoryResolver,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if(this.error){
        this.showErrorAlert(this.error);
      }
    })
  }

  ngOnDestroy(): void {
    if(this.closeSubscription){
      this.closeSubscription.unsubscribe();
    }
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
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
    // SE COMENTÓ POR EL USO DE "ngrx"
    // let authObs: Observable<AuthResponseData>;    

    // AQUÍ MOSTRAMOS EL LOADING SPINNER
    // SE COMENTÓ POR EL USO DE "ngrx"
    // this.isLoading = true

    // ESTE ES EL CASO PARA EL LOGIN
    if(this.isLoginMode){
      // authObs = this.authService.login(email, password);

      this.store.dispatch(new AuthActions.LoginStart({
        email: email,
        password: password
      }))

      // ESTE ES EL CASO PARA EL SIGN UP
    } else {
      // SE COMENTÓ POR EL USO DE "ngrx"
      // authObs = this.authService.signUp(email, password);

      this.store.dispatch(new AuthActions.SignupStart({
        email: email,
        password: password
      }))
    }    

    // FUE COMENTADO POR EL USO DE "ngrx" Y "Effects"
    // authObs.subscribe(
    //   resData => {
    //     console.log(resData);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },errorMessage => {
    //     this.isLoading = false;
    //     this.error = errorMessage;
    //     this.showErrorAlert(errorMessage);
    //     console.log(errorMessage);          
    //   }
    // )

    this.store.select('auth').subscribe(authState => {

    })

    authForm.reset();
  }

  // DE ESTA MANERA LOGRAMOS REINICIAR LA VARIABLE "error" PARA QUE NO SIGA SALIENDO EN EL TEMPLATE
  onHandleError(){
    // SE COMENTÓ PARA USAR ngrx
    // this.error = null;

    this.store.dispatch(new AuthActions.ClearError());
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
