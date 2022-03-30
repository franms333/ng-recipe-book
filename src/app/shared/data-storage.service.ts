import {
  HttpClient, HttpParams
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  Recipe
} from '../recipes/recipe.model';
import {
  RecipeService
} from '../recipes/recipe.service';
import {
  exhaustMap,
  map,
  take,
  tap
} from 'rxjs/operators';
import {
  AuthService
} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();

    return this.http.put('https://ng-course-recipe-book-ec7f2-default-rtdb.firebaseio.com/recipes.json',
      recipes).subscribe(response => {
      console.log(response);
    })
  }

  fetchRecipes() {
    // DE ESTA MANERA PODEMOS TOMAR EL USUARIO ACTUAL Y ÚNICO
    // EL OPERADOR (tale()) PERMITE OBTENER EL NÚMERO DE USUARIOS QUE SE HAN LOGGEADO (EN ESTE CASO 
    // ESPECIFICAMOS QUE QUEREMOS SOLO 1, ES DECIR, EL PRIMERO)
    // LUEGO DE TOMAR 1 SOLO USUARIO, HARÁ "Unsubscribe()" AUTOMÁTICAMENTE
    // POR EL MOMENTO ESTE RETURN SE COMENTÓ YA QUE AHORA SE USA EL QUE ESTÁ DENTRO DEL INTERCEPTOR
    // "auth-interceptor.service.ts"
    // return this.authService.userSubject.pipe(take(1)
      // "exhaustMap" ESPERARÁ A QUE EL PRIMER OBSERVABLE SE COMPLETE (EN ESTE CASO EL PRIMER OBSERVABLE ES
      // EL DE "this.authService.userSubject.pipe(take(1))" Y LUEGO NOS DEVOLVERÁ UN NUEVO OBSERVABLE
      // CON LOS DATOS DEL PRIMER OBSERVABLE RESUELTO

      // POR EL MOMENTO ESTE "exhaustMap" SE COMENTÓ YA QUE AHORA SE USA EL QUE ESTÁ DENTRO DEL INTERCEPTOR
      // "auth-interceptor.service.ts"
      // , exhaustMap(user => {
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-ec7f2-default-rtdb.firebaseio.com/recipes.json',
        ).pipe(
              map(recipes => {
              return recipes.map(recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : []
                };
              });
            }),
            tap(recipes => {
              this.recipesService.setRecipes(recipes);
            }));
    
      // ESTO FUE COMENTADO YA QUE AHORA LO COLOCAMOS PARA QUE FUNCIONE CON EL OPERADOR "exhaustMap()"
      // .pipe(map(recipes => {
      //     return recipes.map(recipe => {
      //       return {
      //         ...recipe,
      //         ingredients: recipe.ingredients ? recipe.ingredients : []
      //       };
      //     });
      //   }),
      //   tap(recipes => {
      //     this.recipesService.setRecipes(recipes);
      //   })
      // )
    // ESTO SE COMENTÓ PORQUE AHORA HAREMOS LA SUSCRIPCIÓN DESDE EL GUARD RESOLVER "recipes-resolver.service.ts"
    // .subscribe(recipes => {
    //   this.recipesService.setRecipes(recipes);
    // });
  }
}
