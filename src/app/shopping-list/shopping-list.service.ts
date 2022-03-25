import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // DE ESTA MANERA PODEMOS MANTENER EL "slice()" Y AÚN ASI NOTIFICAR QUE QUEREMOS USAR LA COPIA DEL "slice"
  // SE USA EL ACERCAMIENTO DEL "Subject<>()" YA QUE ES MEJOR QUE USAR EVENTEMITTERS CUANDO LO QUE SE
  // INTENTA HACER ES PASAR INFORMACIÓN POR OBSERVABLES ENTRE VARIOS COMPONENTES, COMO EN ESTE CASO
  // NOTA: NO USAR "Subject<>()" CUANDO SE INTENTA PASAR INFO POR "@Output" EN ALGUN COMPONENTE
  ingredientChanged = new Subject<Ingredient[]>()
  // ingredientChanged = new EventEmitter<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Manzanas', 5),
    new Ingredient('Tomates', 10)
  ];

  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);

    // SE USA AHORA "next()" YA QUE SE CAMBIÓ DE USAR UN EVENT EMITTER A USAR UN SUBJECT
    this.ingredientChanged.next(this.ingredients);
    // this.ingredientChanged.emit(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    // SE USA AHORA "next()" YA QUE SE CAMBIÓ DE USAR UN EVENT EMITTER A USAR UN SUBJECT
    this.ingredientChanged.next(this.ingredients);
    // this.ingredientChanged.emit(this.ingredients);
    
    // ESTA SOLUCIÓN NO ES MUY BUENA PORQUE HARÍA QUE SE EMITAN MUCHOS EVENTOS
    // ingredients.forEach((item)=>{
    //   this.addIngredient(item);
    // })
  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
