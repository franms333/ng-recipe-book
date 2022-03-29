import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
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
        console.log(errorMessage);          
      }
    )

    authForm.reset();
  }

}
