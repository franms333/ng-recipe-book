import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false; 
  recipeForm: FormGroup;
  recipeIngredients = new FormArray([]);

  constructor(private route: ActivatedRoute, 
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  // INICIALIZARÁ NUESTRO FORM
  private initForm(){    
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
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
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
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