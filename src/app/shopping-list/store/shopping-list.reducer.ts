import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State{
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

// LAS STORE GLOBALES NO SE DEBEN COLOCAR ACÁ, DEBE IR DENTRO DEL ARCHIVO "app.reducer.ts"
// export interface AppState {
//     shoppingList: State;
// }

// DE ESTA CREAMOS NUESTRO "state" INICIAL
const initialState: State = {
    ingredients: [
        new Ingredient('Manzanas', 5),
        new Ingredient('Tomates', 10)
      ],
    editedIngredient: null,
    editedIngredientIndex: -1  
};
// LOS REDUCERS SON FUNCIONES QUE SE EXPORTAN Y SE ENCARGAN DE MANIPULAR UNA COPIA DE LOS DATOS QUE LUEGO
// SE DESEAN SOBREESCRIBIR EN EL "STORE"
// RECIBEN 2 PARÁMETROS:
// 1.- EL "state" ACTUAL (ENTENDIENDO AL "state" COMO TODO DATO O INFORMACIÓN QUE SE QUIERE MOSTRAR EN LA APP)
// 2.- EL "action" QUE ES EL QUE DISPARA AL REDUCER, ESTE "action" PUEDE SER DEL TIPO "Action"
// LO CUAL LE AGREGA UN ATRIBUTO "type"
export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
    // AHORA PODEMOS HACER QUE EL REDUCER TENGA UN SWITCH PARA CADA ACCIÓN QUE QUERRAMOS HACER
    switch (action.type) {
        // ESTE ES EL CASO DE "addIngredient" EN EL SERVICIO DE "shopping-list.service.ts"
        case ShoppingListActions.ADD_INGREDIENT:
            // CADA CASO TIENE QUE RETORNAR UN JSON
            return {
                // DE ESTA MANERA COPIAMOS TODOS LOS ELEMENTOS DENTRO DEL STATE
                ...state,
                // DE ESTA MANERA CREAMOS UNA PROPIEDAD LLAMADA "ingredients" Y DENTRO DE ESTA PONEMOS
                // LA COPIA DE LOS INGREDIENTES ANTERIORES Y LUEGO (en este caso) UNA PROPIEDAD NUEVA
                // QUE VIENE EN LA VARIABLE LOCAL "action"
                // EL "payload" EN ESTE CASO SERÁ LO QUE CAMBIARÁ EN NUESTRO STORE CUANDO LO SOBREESCRIBAMOS
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        case ShoppingListActions.UPDATE_INGREDIENT:
            // DE ESTA MANERA TOMAMOS EL INGREDIENTE QUE SE QUIERE MODIFICAR
            // ESTA SOLUCIÓN SE COMENTÓ YA QUE NO USAMOS INDEX DENTRO DEL PAYLOAD, PODEMOS SACARLO
            // DIRECTAMENTE DESDE EL "state.editedIngredientIndex"
            // const ingredient = state.ingredients[action.payload.index];
            const ingredient = state.ingredients[state.editedIngredientIndex];
            // DE ESTA MANERA MODIFICAMOS EL INGREDIENTE ENTERO, PRIMERO HACEMOS UNA COPIA DEL MISMO
            // LUEGO LO SOBREESCRIBIMOS POR EL "...action.payload.ingredient"
            const updatedIngredient = {
                // 1.- COPIA DEL INGREDIENTE VIEJO
                ...ingredient,
                // 2.- SOBREESCRITURA DEL INGREDIENTE VIEJO
                // ESTA SOLUCIÓN SE COMENTÓ YA QUE NO ES NECESARIO INGRESAR AL INGREDIENTE DIRECTAMENTE
                // ...action.payload.ingredient
                ...action.payload
            }
            // COPIA ACTUAL DE TODOS LOS INGREDIENTES VIEJOS
            const updatedIngredients = [...state.ingredients];

            // DE ESTA MANERA SELECCIONAMOS EL INGREDIENTE QUE QUEREMOS MODIFICAR Y LO SOBREESCRIBIMOS
            // ESTA SOLUCIÓN SE COMENTÓ YA QUE NO USAMOS INDEX DENTRO DEL PAYLOAD, PODEMOS SACARLO
            // DIRECTAMENTE DESDE EL "state.editedIngredientIndex"
            // updatedIngredients[action.payload.index] = updatedIngredient;

            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            // SOBREESCRITURA ENTERA USANDO "ngrx" DE LOS INGREDIENTES
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            }

        case ShoppingListActions.DELETE_INGREDIENT:
            
            return {
                ...state,
                ingredients: state.ingredients.filter((ing, ingIndex) => {
                    // ESTA SOLUCIÓN SE COMENTÓ YA QUE NO USAMOS INDEX DENTRO DEL PAYLOAD, PODEMOS SACARLO
                    // DIRECTAMENTE DESDE EL "state.editedIngredientIndex"
                    // return ingIndex !== action.payload;
                    return ingIndex !== state.editedIngredientIndex;
                }),
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            }
        case ShoppingListActions.STOP_EDIT:
            return{
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        // ES NECESARIO PONER UN DEFAULT O SINO NO FUNCIONARÁ
        default:
            // EL DEFAULT SERÁ SIMPLEMENTE RETORNAR EL "state" ORIGINAL
            return state;
    }
}