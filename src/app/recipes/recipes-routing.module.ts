import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  // ESTO FUE COMENTADO PARA PODER USAR LAZY LOADING
  // {path: 'recipes', component: RecipesComponent, 

  // EN ORDEN DE PODER USAR LAZY LOADING, DEBEMOS DECLARAR EL PRIMER PATH VACÍO
  // TAMBIÉN ES NECESARIO USAR "forChild()" EN ESTE ARCHIVO PARA PODER USAR LAZY LOADING
  {path: '', component: RecipesComponent, 
  canActivate: [AuthGuard],
  children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
  ]},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // "forChild()"" HACE UN MERGE ENTRE LAS RUTAS DEFINIDAS EN EL MODULO DONDE SE INVOCA Y LAS RUTAS,
    // DEL MODULE DONDE SE INVOCA EL MÉTODO "forRoot()"
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
