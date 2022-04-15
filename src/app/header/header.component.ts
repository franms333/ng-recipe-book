import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{
    collapsed = true;
    isAuthenticated = false;
    private userSub: Subscription;
    

    constructor(
                // private dataStorageService: DataStorageService, 
                // private authService: AuthService,
                private store: Store<fromApp.AppState>
                ){

    }

    ngOnInit(): void {

        // ESTO FUE COMENTADO PARA USAR "ngrx"
        // this.userSub = this.authService.userSubject.subscribe(user => {
        
        // ESTA ES LA SOLUCÓN USANDO "ngrx"
        this.userSub = this.store.select('auth')
        // ESTE PASO USANDO "map" LO USAMO ÚNICAMENTE PARA EL CASO DE "ngrx" YA QUE AQUÍ
        // EL "map" NOS RETORNA EL "user" QUE ENTRA POR EL "State" DE "fWromApp"
        .pipe(
            map(authState => {
                return authState.user;
            })
             // SI NO QUEREMOS USAR "ngrx" SOLO HAY QUE COMENTAR LAS LÍNEAS DEL "map"W
        ).subscribe(user => {
            // ESTE TRUCO DE USAR "!!user" ES LO MISMO QUE PONER "!user ? false : true"
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        });        
    }

    onSaveData(){
        // ESTO FUE COMENTADO PARA USAR "ngrx"
        // this.dataStorageService.storeRecipes();

        // ESTA ES LA SOLUCIÓN USANDO "ngrx"
        this.store.dispatch(new RecipesActions.StoreRecipes());
    }

    onFetchData(){
        // ESTO SE COMENTÓ YA QUE AHORA SE USA A TRAVÉS DE "ngrx"
        // this.dataStorageService.fetchRecipes().subscribe();

        this.store.dispatch(new RecipesActions.FetchRecipes());
    }

    onLogout(){
        // FUE COMENTADO PARA USAR "ngrx"
        // this.authService.logout();

        // ESTA ES LA SOLUCIÓN USANDO "ngrx"
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}

