import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
// import { RecipeService } from './recipe.service';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(
              private dataStorageService: DataStorageService, 
              // private recipesService: RecipeService,
              private store: Store<fromApp.AppState>,
              private actions$: Actions
              ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    // SE COMENTÓ PARA USAR "ngrx"
    // const recipes = this.recipesService.getRecipes();
      // NO NOS SUCRIBIMOS PORQUE EL RESOLVER SE ENCARGARÁ DE SUSCRIBIRSE AL MOMENTO DE CARGARSE LA RUTA
      // return this.dataStorageService.fetchRecipes();

      return this.store.select('recipes')
      .pipe(
        take(1),
          map(recipesState => {
            return recipesState.recipes;
          }),
          switchMap(recipes => {
            if(recipes.length === 0){
              this.store.dispatch(new RecipesActions.FetchRecipes());
              return this.actions$.pipe(
                ofType(RecipesActions.SET_RECIPES)
                ,take(1)
              );
            } else {
              return of(recipes);
          }
        })
      );      
    }
}
