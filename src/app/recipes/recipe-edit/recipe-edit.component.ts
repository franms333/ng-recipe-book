import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
// import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';
import * as RecipesActions from '../store/recipe.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false; 
  recipeForm: FormGroup;
  recipeIngredients = new FormArray([]);

  private storeSub: Subscription;

  constructor(private route: ActivatedRoute, 
              // private recipeService: RecipeService,
              private router: Router,
              private store: Store<fromApp.AppState>
              ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  ngOnDestroy(): void {
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }    
  }

  // INICIALIZARÁ NUESTRO FORM
  private initForm(){    
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if(this.editMode){
      // ESTO FUE COMENTADO POR EL USO DE "ngrx"
      // const recipe = this.recipeService.getRecipe(this.id);

      // ESTA ES LA SOLUCIÓN USANDO "ngrx"
      this.storeSub = this.store.select('recipes').pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          })
        })
      ).subscribe((recipe) => {
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if(recipe['ingredients']){
          recipe.ingredients.forEach((ingredient) => {
            this.recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required), 
                'amount': new FormControl(ingredient.amount, 
                                          [Validators.required, 
                                          Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            );
          })
        }
      });      
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': this.recipeIngredients
    })
  }

  controls() { // CON ESTO NOS TRAEMOS EL ARRAY DE INGREDIENTES
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit(){
    // const newRecipe = new Recipe(this.recipeForm.value['name'], 
    //                             this.recipeForm.value['description'],
    //                             this.recipeForm.value['imagePath'],
    //                             this.recipeForm.value['ingredients']);
    if(this.editMode){
      // ESTO FUE COMENTADO PARA USAR "ngrx"
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);

      // ESTA ES LA SOLUCIÓN USANDO "ngrx"
      this.store.dispatch(new RecipesActions.UpdateRecipe({
        index: this.id,
        newRecipe: this.recipeForm.value
      }));
    } else {
      // ESTO FUE COMENTADO PARA USAR "ngrx"
      // this.recipeService.addRecipe(this.recipeForm.value);

      // ESTA ES LA SOLUCIÓN USANDO "ngrx"
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, 
                                        Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

    // DE ESTA MANERA PODEMOS ELIMINAR TODOS LOS ELEMENTOS DENTRO DE UN "<FormArray>"
    // (<FormArray>this.recipeForm.get('ingredients')).clear();
  }
  
}
