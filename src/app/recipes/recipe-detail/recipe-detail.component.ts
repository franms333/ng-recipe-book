import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
// import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import * as RecipesActions from '../store/recipe.actions';
import * as ShoppinglistActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
              // private recipeService: RecipeService, 
              private route: ActivatedRoute, 
              private router: Router,
              private store: Store<fromApp.AppState>
              ) { }

  ngOnInit(): void {
    // ESTE ES EL ACERCAMIENTO USANDO "ngrx"
    this.route.params.pipe(
      map((params: Params) => {
        return +params['id'];
      }), switchMap(id => {
        this.id = id
        return this.store.select('recipes');
      }), map(recipesState => {
        return recipesState.recipes.find((recipe, index)=> {
          return index === this.id;
        })
      })).subscribe(recipe => {
        this.recipe = recipe;
      })       

        // ESTO SE COMENTÓ YA QUE AHORA USAREMOS EL ACERCAMIENTO USANDO "ngrx"
        // this.recipe = this.recipeService.getRecipe(this.id);

        // .subscribe(
        // (params: Params)=>{
        //   this.id = +params['id'];       
  }

  onAddToShoppingList(){
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);

    this.store.dispatch(new ShoppinglistActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    // ESTO FUE COMENTADO PARA USAR "ngrx"
    // this.recipeService.onDeleteRecipe(this.id);

    // ESTA ES LA SOLUCIÓN USANDO "ngrx"
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(["/recipes"]);
  }

}
