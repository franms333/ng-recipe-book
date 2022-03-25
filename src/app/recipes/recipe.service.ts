import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // LA RAZÓN POR LA CUAL CREAMOS OTRO SUBJECT ES PORQUE AL ACTUALIZAR O AGREGAR UNA NUEVA RECETA,
  // LO HACEMOS DENTRO DE LA COPIA DEL ARRAY DE "Recipe[]" Y NO EN EL ARRAY ORIGINAL, AL CREAR UN SUBJECT
  // ENTONCES PODEMOS HACER QUE SE ACTUALICE LA COPIA QUE ESTAMOS MODIFICANDO 
  recipesChanged = new Subject<Recipe[]>();

  // ESTO SE COMENTÓ GRACIAS AL USO DEL SERVICIO "data-storage.service.ts"
  // private recipes: Recipe[] = [
  //   new Recipe("Un pastichito", 
  //              "No pierde con nada", 
  //              "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
  //              [
  //                new Ingredient('Carne', 500),
  //                new Ingredient('Pasta', 500)
  //              ]),
  //   new Recipe("Coyo otro pasticho", 
  //              "Nawará", 
  //              "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
  //              [
  //                new Ingredient('Tomatico', 5),
  //                new Ingredient('Especias', 6)
  //              ])
  // ];

  private recipes: Recipe[] = [];


  // recipeSelected = new Subject<Recipe>();
  // recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  onDeleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
