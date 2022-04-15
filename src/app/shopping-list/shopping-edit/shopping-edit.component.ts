import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
// import * as fromShoppingList from '../store/shopping-list.reducer'
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
// EL SERVICIO "ShoppingListService" FUE COMENTADO YA QUE TODO SE PUEDE USAR AHORA CON "ngrx"
// import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions'
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // SE ELIMINAN LOS VIEWCHILD PORQUE YA PODEMOS ACCEDER A LOS INPUT DEL FORMULARIO USANDO "ngForm"
  // @ViewChild('nameInput', {static:true}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static:true}) amountInputRef: ElementRef;

  // YA NO ES NECESARIO EMITIR EL EVENTO GRACIAS AL USO DE SERVICIOS
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('f', {static:true}) shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(
    // EL SERVICIO "ShoppingListService" FUE COMENTADO YA QUE TODO SE PUEDE USAR AHORA CON "ngrx"
    // private shoppingListService: ShoppingListService, 

    // ESTO SE COMENTÓ YA QUE AHORA EL RETORNO DEL STORE ES EL "AppState" DE LA INTERFAZ "fromShoppingList"
    // private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
    // private store: Store<fromShoppingList.AppState>

    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.shoppingListForm.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount
        })
      } else {
        this.editMode = false;
      }
    });

    // SE COMENTÓ POR EL USO DE "ngrx"
    // this.subscription = this.shoppingListService.startedEditing.subscribe(
    //   (index:number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedItem = this.shoppingListService.getIngredient(index);
    //     this.shoppingListForm.setValue({
    //       'name': this.editedItem.name,
    //       'amount': this.editedItem.amount
    //     })
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onSubmit(form: NgForm){
    const value = form.value;
    // ESTAS VARIABLES SE ELIMINARON PORQUE AHORA USAMOS LOS DATOS DIRECTAMENTE TOMADOS DESDE EL FORMULARIO
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;

    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      // SE COMENTÓ POR EL USO DE "ngrx"
      // this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);


      // ESTA SOLUCIÓN SE COMENTÓ YA QUE NO USAMOS INDEX DENTRO DEL PAYLOAD
      // this.store.dispatch(new ShoppingListActions.UpdateIngredient(
      //   ingredient: newIngredient}
      // ))

      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient))
    } else{
      // SE COMENTÓ POR EL USO DE "ngrx"
      // this.shoppingListService.addIngredient(newIngredient);

      // DE ESTA MANERA CREAMOS UN NUEVO PAYLOAD O ACCIÓN DENTRO DE NUESTRO STORE
      // "dispatch" PERMITE "DESPACHAR" UNA NUEVA ACCIÓN EN LUGAR DE SELECCIONARLA
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.shoppingListForm.reset();
    this.editMode = false;
    
    // YA NO ES NECESARIO EMITIR EL EVENTO GRACIAS AL USO DE SERVICIOS
    // this.ingredientAdded.emit(newIngredient);
  }

  onClearForm(){
    this.shoppingListForm.reset();
    this.editMode = false;

    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDeleteItem(){
    // SE COMENTÓ POR EL USO DE "ngrx"
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);

    // ESTA SOLUCIÓN SE COMENTÓ YA QUE NO USAMOS INDEX DENTRO DEL PAYLOAD
    // this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));

    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClearForm();
  }

}
