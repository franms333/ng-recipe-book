// import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { AppRoutingModule } from '../app-route/app-route.module';
import { SharedModule } from '../shared/shared.module';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';



@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  // EN ANGULAR, TODOS LOS MODULOS TRABAJAN DE FORMA INDIVIDUAL, ES DECIR, SI TENEMOS IMPORTS PUESTOS EN
  // EL "app.module.ts" Y QUEREMOS QUE ESOS MISMOS IMPORTS FUNCIONEN EN LOS MODULES QUE CREEMOS EN EL 
  // FUTURO, ES NECESARIO IMPORTAR O DECLARAR CORRECTAMENTE ESOS MISMOS EN EL NUEVO ARCHIVO "MODULES"
  imports: [
    // EL "CommonModule" SE COMENTÓ YA QUE AHORA SE USA A TRAVÉS DEL "SharedModule"
    // CommonModule,
    // EL "SharedModule" ES EL CREADO EN EL ARCHIVO "shared.module.ts"
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    RecipesRoutingModule
  ]
  // ESTO SE COMENTÓ YA QUE ESTAMOS USANDO EL ARCHIVO "RecipesRoutingModule" POR LO TANTO YA
  // NO ES NECESITA EXPORTAR LOS COMPONENTES AQUÍ ABAJO YA QUE NO LOS ESTAMOS USANDO PROPIAMENTE
  // EN EL APP MODULE O EN EL ARCHIVO DE ROUTING BASE, SINO EN EL ARCHIVO DE ROUTING "recipes-routing.module.ts"
  // exports: [
  //   RecipesComponent,
  //   RecipeListComponent,
  //   RecipeDetailComponent,
  //   RecipeItemComponent,
  //   RecipeStartComponent,
  //   RecipeEditComponent
  // ]
})
export class RecipesModule { }
