import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

// DE ESTA MANERA NOS CERCIORAMOS DE QUE NO SE GENEREN TYPOS AL MOMENTO DE ESCRIBIR LOS CASOS EN EL REDUCER
export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

// AHORA CREAMOS UNA CLASE QUE RESPONDA AL CASO DE ACCIÓN QUE TENEMOS Y QUE IMPLEMENTE LA INTERFAZ "Action"
// DE "ngrx". ESTA CLASE AHORA NECESITA OBLIGATORIAMENTE TENER UNA VARIABLE "type" QUE SEA IGUAL
// A LA CONSTANTE RELATIVA A LA ACCIÓN (en este caso "ADD_INGREDIENT")
// CADA ACCIÓN DEBE TENER SU PROPIA CLASE
export class AddIngredient implements Action{
    // "readonly" ES UNA PROPIEDAD DE JAVASCRIPT QUE PERMITE QUE UNA VARIABLE NO PUEDA SER MODIFICADA
    // DESDE AFUERA
    // PROCURAR NUNCA COLOCAR ": string" AL "type" YA QUE DARÁ ERROR AL MOMENTO DE USAR EL "SPREAD OPERATOR"
    // EN EL REDUCER
    readonly type = ADD_INGREDIENT;

    // "payload" ES EL NOMBRE QUE LE DAMOS PARA ESTE EJEMPLO, PERO PUEDE TENER CUALQUIER NOMBRE
    // payload: Ingredient;

    constructor(public payload: Ingredient){}
}

export class AddIngredients implements Action{
    // PROCURAR NUNCA COLOCAR ": string" AL "type" YA QUE DARÁ ERROR AL MOMENTO DE USAR EL "SPREAD OPERATOR"
    // EN EL REDUCER
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]){}
}

export class UpdateIngredient implements Action{
    // PROCURAR NUNCA COLOCAR ": string" AL "type" YA QUE DARÁ ERROR AL MOMENTO DE USAR EL "SPREAD OPERATOR"
    // EN EL REDUCER
    readonly type = UPDATE_INGREDIENT;

    // LOS PARÁMETROS DEL CONSTRUCTOR SIEMPRE COINCIDEN CON LO QUE PEDÍAN LOS MÉTODOS A LOS QUE SE 
    // REFIERE LA ACCIÓN (EN ESTE CASO AL MÉTODO "UpdateIngredient" DEL ARCHIVO "shopping-list.service.ts")
    // ESTA SOLUCIÓN FUE COMENTADA YA QUE YA NO NECESITAMOS PASAR EL INDEX COMO PARÁMETRO
    // constructor(public payload: {index: number, ingredient: Ingredient}){}

    // ESTA ES LA SOLUCIÓN CORRECTA SIN PEDIR EL INDEX COMO PARÁMETRO
    constructor(public payload: Ingredient){}
}

export class DeleteIngredient implements Action{
    // PROCURAR NUNCA COLOCAR ": string" AL "type" YA QUE DARÁ ERROR AL MOMENTO DE USAR EL "SPREAD OPERATOR"
    // EN EL REDUCER
    readonly type = DELETE_INGREDIENT;

    // LOS PARÁMETROS DEL CONSTRUCTOR SIEMPRE COINCIDEN CON LO QUE PEDÍAN LOS MÉTODOS A LOS QUE SE 
    // REFIERE LA ACCIÓN (EN ESTE CASO AL MÉTODO "DeleteIngredient" DEL ARCHIVO "shopping-list.service.ts")
    // ESTA SOLUCIÓN FUE COMENTADA YA QUE YA NO NECESITAMOS PASAR EL INDEX COMO PARÁMETRO
    // constructor(public payload: number){}
}

export class StartEdit implements Action{
    readonly type = START_EDIT;

    constructor(public payload: number){}
}

export class StopEdit implements Action{
    readonly type = STOP_EDIT;
}

export type ShoppingListActions = 
AddIngredient 
| AddIngredients 
| UpdateIngredient 
| DeleteIngredient
| StartEdit
| StopEdit;

