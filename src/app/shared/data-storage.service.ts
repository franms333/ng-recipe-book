import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipeService) { }

  storeRecipes(){
    const recipes = this.recipesService.getRecipes();
    
    return this.http.put('https://ng-course-recipe-book-ec7f2-default-rtdb.firebaseio.com/recipes.json',
                  recipes).subscribe(response=>{
                    console.log(response);
                  })
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>('https://ng-course-recipe-book-ec7f2-default-rtdb.firebaseio.com/recipes.json')
    .pipe(map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }),
        tap(recipes => {
          this.recipesService.setRecipes(recipes);
        })
    )
    // ESTO SE COMENTÓ PORQUE AHORA HAREMOS LA SUSCRIPCIÓN DESDE EL GUARD RESOLVER "recipes-resolver.service.ts"
    // .subscribe(recipes => {
    //   this.recipesService.setRecipes(recipes);
    // });
  }
}
