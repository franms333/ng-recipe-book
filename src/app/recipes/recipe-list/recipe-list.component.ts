import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
// import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  // EL OUTPUT FUE ELIMINADO GRACIAS AL USO DE SERVICIOS 
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  // = [
  //   new Recipe("Prueba", 
  //              "Esto es un texto de prueba", 
  //              "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"),
  //   new Recipe("Otra Prueba", 
  //              "Esto es otro texto de prueba", 
  //              "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505")
  // ];
  constructor(
              // private recipeService: RecipeService, 
              private router: Router, 
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    // ESTO SE COMENTÓ PARA USAR EL ACERCAMIENTO CON "ngrx"
    // this.subscription = this.recipeService.recipesChanged.subscribe(

    // ESTE ES EL ACERCAMIENTO CON "ngrx"
    this.subscription = this.store.select('recipes')
    .pipe(
      map(recipesState => recipesState.recipes))
        .subscribe(
          (recipes: Recipe[])=>{
            this.recipes = recipes;
          }
        )

        // ESTO FUE COMENTADO PORQUE AHORA USAREMOS EL ACERCAMIENTO CON "ngrx"
        // this.recipes = this.recipeService.getRecipes();
      }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // ESTA FUNCIÓN FUE ELIMINADA GRACIAS AL USO DE SERVICIOS 
  // onRecipeSelected(recipe: Recipe){
  //   this.recipeWasSelected.emit(recipe);
  // }

  onNewRecipe(){
    this.router.navigate(["new"], {relativeTo: this.route})
  }
}
