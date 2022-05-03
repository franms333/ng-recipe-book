import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { AuthComponent } from '../auth/auth.component';
// import { AuthGuard } from '../auth/auth.guard';
// import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
// import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
// import { RecipeStartComponent } from '../recipes/recipe-start/recipe-start.component';
// import { RecipesResolverService } from '../recipes/recipes-resolver.service';
// import { RecipesComponent } from '../recipes/recipes.component';
// import { ShoppingListComponent } from '../shopping-list/shopping-list.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch:"full"},

  // DE ESTA MANERA LOGRAMOS USAR EL LAZY LOADING
  // LAZY LOADING: SE USA PARA EVITAR QUE ANGULAR DESCARGUE TODOS LOS COMPONENTES AL MOMENTO DE ENTRAR
  // A LA APLICACIÓN WEB, EN CAMBIO, LO QUE HACE ES DESCARGAR CADA COMPONENTE A MEDIDA QUE ES CARGADO
  // PARA HACER ESTO, NECESITAMOS AGREGAR EN EL ARCHIVO DE RUTAS UN "path" CON EL NOMBRE DE LA RUTA
  // QUE QUEREMOS QUE CARGUE CON LAZY LOADING, LUEGO AGREGAMOS UNA PROPIEDAD QUE SE LLAMA "loadChildren"
  // ESTA PROPIEDAD VA A CARGAR LAS RUTAS Y COMPONENTES HIJAS AL MOMENTO EN QUE SE INGRESA A ESE PATH
  // Y NO AL PRINCIPIO COMO SUELE HACER ANGULAR
  // LUEGO, HAY QUE CREAR UNA ARROW FUNCTION QUE INVOQUE EL MÉTODO "import()", DENTRO DEL MÉTODO "import()"
  // PONDREMOS LA RUTA DEL MODULE QUE QUEREMOS CARGAR CON LAZY LOADING, LUEGO, COMO "import()" ES UNA
  // PROMESA, DEBEMOS CREAR UN ESCENARIO DE "then" EN EL CUAL HAREMOS UNA ARROW FUNCTION DONDE EL
  // PARÁMETRO ES EL MODULE CORRECTAMENTE CARGADO DEL "import()", LUEGO DE ESO HACEMOS QUE DICHA FUNCION
  // RETORNE ESE MODULE CON LA CLASE DE ESE MISMO MODULE. EJEMPLO: "then(m=> m.RecipesModule)"
  {path: 'recipes', 
  loadChildren: () => import('../recipes/recipes.module').then(m => m.RecipesModule)
  },

  {path: 'shopping-list',
  loadChildren: () => import('../shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },

  {path: 'auth',
  loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
  }

  // FUERON MOVIDOS AL ARCHIVO "recipes-routing.module.ts"
  // {path: 'recipes', component: RecipesComponent, 
  // canActivate: [AuthGuard],
  // children: [
  //   {path: '', component: RecipeStartComponent},
  //   {path: 'new', component: RecipeEditComponent},
  //   {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
  //   {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
  // ]},

  // FUE MOVIDO AL ARCHIVO "shopping-list-routing.module.ts"
  // {path: 'shopping-list', component: ShoppingListComponent},

  // ESTE PATH SE COMENTÓ YA QUE AHORA SE USA DENTRO DE LA FUNCIÓN "forChild()" DENTRO DEL ARCHIVO
  // auth.module.ts
  // {path: 'auth', component: AuthComponent}
];

@NgModule({
  declarations: [],
  imports: [
    // "preloadingStrategy" ES UN SEGUNDO ARGUMENTO QUE PODEMOS AGREGARLE AL MÉTODO "forRoot()"
    // EN EL QUE LE DECIMOS A ANGULAR QUE QUEREMOS QUE PRE-CARGUE LOS MODULOS UNA VEZ SE RESUELVE
    // EL PRIMERO DE ELLOS, DE ESTA MANERA EVITAMOS EL PEQUEÑO DELAY QUE SE GENERA AL USAR LAZY LOADING
    // QUE HACE QUE ANGULAR DESCARGE LOS BUNDLES DE CADA MODULE A MEDIDA QUE EL USUARIO LO CARGA
    // "preloadingStrategy" ES UN SEGUNDO ARGUMENTO QUE PODEMOS AGREGARLE AL MÉTODO "forRoot()"
// EN EL QUE LE DECIMOS A ANGULAR QUE QUEREMOS QUE PRE-CARGUE LOS MODULOS UNA VEZ SE RESUELVE
// EL PRIMERO DE ELLOS, DE ESTA MANERA EVITAMOS EL PEQUEÑO DELAY QUE SE GENERA AL USAR LAZY LOADING
// QUE HACE QUE ANGULAR DESCARGE LOS BUNDLES DE CADA MODULE A MEDIDA QUE EL USUARIO LO CARGA
// "preloadingStrategy" ES UN SEGUNDO ARGUMENTO QUE PODEMOS AGREGARLE AL MÉTODO "forRoot()"
// EN EL QUE LE DECIMOS A ANGULAR QUE QUEREMOS QUE PRE-CARGUE LOS MODULOS UNA VEZ SE RESUELVE
// EL PRIMERO DE ELLOS, DE ESTA MANERA EVITAMOS EL PEQUEÑO DELAY QUE SE GENERA AL USAR LAZY LOADING
// QUE HACE QUE ANGULAR DESCARGE LOS BUNDLES DE CADA MODULE A MEDIDA QUE EL USUARIO LO CARGA
// "preloadingStrategy" ES UN SEGUNDO ARGUMENTO QUE PODEMOS AGREGARLE AL MÉTODO "forRoot()"
// EN EL QUE LE DECIMOS A ANGULAR QUE QUEREMOS QUE PRE-CARGUE LOS MODULOS UNA VEZ SE RESUELVE
// EL PRIMERO DE ELLOS, DE ESTA MANERA EVITAMOS EL PEQUEÑO DELAY QUE SE GENERA AL USAR LAZY LOADING
// QUE HACE QUE ANGULAR DESCARGE LOS BUNDLES DE CADA MODULE A MEDIDA QUE EL USUARIO LO CARGA
RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' }),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
