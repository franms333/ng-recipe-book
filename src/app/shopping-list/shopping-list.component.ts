import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


import * as ShoppingListActions from './store/shopping-list.actions';

// FUE COMENTADO DEBIDO A QUE AHORA USAMOS EL ACERCAMIENTO DEL "app.reducer"
// import * as fromShoppingList from './store/shopping-list.reducer';

import * as fromApp from '../store/app.reducer';

import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
// EL SERVICIO "ShoppingListService" FUE COMENTADO YA QUE TODO SE PUEDE USAR AHORA CON "ngrx"
// import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[]; <- SE CAMBIÓ EN EL MÓDULO DE ngrx

  // LO VOLVIMOS UN OBSERVABLE
  ingredients: Observable<{ingredients: Ingredient[]}>

  // ESTA VARIABLE SE 
  private subscription: Subscription;

  constructor(
    // EL SERVICIO "ShoppingListService" FUE COMENTADO YA QUE TODO SE PUEDE USAR AHORA CON "ngrx"
    // private shoppingListService: ShoppingListService,
    private loggingService : LoggingService, // <- NO ES NECESARIO, PERO LO DEJAREMOS POR AHORA

    // "Store" TENDRÁ LOS ALIAS DE CADA REDUCER QUE COLOCAMOS DENTRO DEL "app.module.ts" Y SERÁN DEL TIPO
    // JSON CON LAS PROPIEDADES DE ESE OBJETO
    // ESTO SE CAMBIO DEBIDO A QUE AHORA LO INSTANCIAMOS COMO UNA INTERFAZ
    // private store: Store<{shoppingList: {ingredients: Ingredient[]}}>

    // private store: Store<fromShoppingList.AppState>
    private store: Store<fromApp.AppState>

    ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');


    // ESTO FUE COMENTADO DEBIDO AL USO DE "ngrx"
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscription = this.shoppingListService.ingredientChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );    
  }

  ngOnDestroy(): void {
    // ESTO FUE COMENTADO DEBIDO AL USO DE "ngrx"
    // this.subscription.unsubscribe();
  }

  onEditItem(index: number){
    // ESTO FUE COMENTADO DEBIDO AL USO DE "ngrx"
    // this.shoppingListService.startedEditing.next(index);

    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  // SE ELIMINÓ GRACIAS AL USO DE SERVICIOS
  // onIngredientAdded(ingredient: Ingredient){
  //   this.ingredients.push(ingredient);
  // }
}
