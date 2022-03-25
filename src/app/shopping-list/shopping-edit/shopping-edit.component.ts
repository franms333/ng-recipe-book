import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

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
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index:number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount
        })
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm){
    const value = form.value;
    // ESTAS VARIABLES SE ELIMINARON PORQUE AHORA USAMOS LOS DATOS DIRECTAMENTE TOMADOS DESDE EL FORMULARIO
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;

    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.shoppingListForm.reset();
    this.editMode = false;
    
    // YA NO ES NECESARIO EMITIR EL EVENTO GRACIAS AL USO DE SERVICIOS
    // this.ingredientAdded.emit(newIngredient);
  }

  onClearForm(){
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDeleteItem(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClearForm();
  }

}
