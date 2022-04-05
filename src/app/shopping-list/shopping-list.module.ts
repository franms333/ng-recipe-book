import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    // EL "CommonModule" SE COMENTÓ YA QUE AHORA SE USA A TRAVÉS DEL "SharedModule"
    // CommonModule,
    // EL "SharedModule" ES EL CREADO EN EL ARCHIVO "shared.module.ts"
    SharedModule,
    // RouterModule.forChild([{path: 'shopping-list', component: ShoppingListComponent}]),

    RouterModule.forChild([
      {path: '', 
      component: ShoppingListComponent}
    ]),
    FormsModule
  ]
})
export class ShoppingListModule { }
