import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
// ES UN MODULE DE ANGULAR QUE PERMITE SETEAR UN STORE 
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-route/app-route.module';
import { AppComponent } from './app.component';
// import { AuthInterceptorService } from './auth/auth-interceptor.service';
// import { AuthComponent } from './auth/auth.component';
// import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core.module';
import { HeaderComponent } from './header/header.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
// import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
// import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipesComponent } from './recipes/recipes.component';
// import { RecipesModule } from './recipes/recipes.module';
// import { AlertComponent } from './shared/alert/alert.component';
// import { DropdownDirective } from './shared/dropdown.directive';
// import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
// import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { SharedModule } from './shared/shared.module';

// import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
// import { authReducer } from './auth/store/auth.reducer';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';

// import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from 'src/environments/environment';
import { RecipesEffect } from './recipes/store/recipe.effects';

// TODO ESTO ES PARA EL "ANGULAR ANIMATIONS"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style } from '@angular/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    // ANTES ESTABAN AQU?? LOS SIGUIENTES COMPONENTES:
    // RecipesComponent,
    // RecipeListComponent,
    // RecipeDetailComponent,
    // RecipeItemComponent,
    // FUERON MOVIDOS AL "recipes.module.ts"

    // FUERON MOVIDOS AL "shopping-list.module.ts"
    // ShoppingListComponent,
    // ShoppingEditComponent,
    
    // ESTE DIRECTIVE FUE COMENTADO YA QUE SE MOVI?? SU USO AL "shared.module.ts"
    // DropdownDirective,
    
    // ANTES ESTABAN AQU?? LOS SIGUIENTES COMPONENTES:
    // RecipeStartComponent,
    // RecipeEditComponent,
    // FUERON MOVIDOS AL "recipes.module.ts"

    // SE COMENT?? ESTO DEBIDO A QUE AHORA SE MOVI?? SU USO DENTRO DEL ARCHIVO "auth.module.ts"
    // AuthComponent,

    // ESTOS COMPONENTES Y DIRECTIVES FUERON COMENTADOS PORQUE SE MOVI?? SU USO AL "shared.module.ts"
    // LoadingSpinnerComponent,
    // AlertComponent,
    // PlaceholderDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),

    // ESTO SE COMENT?? YA QUE EN EL "app.component" O EN ALGUNO DE SUS COMPONENTES NO USAMOS NING??N
    // FORMULARIO
    // FormsModule,

    AppRoutingModule,

    // ESTO SE COMENT?? YA QUE EN EL "app.component" O EN ALGUNO DE SUS COMPONENTES NO USAMOS EL
    // "ReactiveFormApproach"
    // ReactiveFormsModule,

    // IMPORTANDO "HttpClientModule" PODEMOS HACER REQUEST HTTP EN CUALQUIER PARTE DE NUESTRA APP ANGULAR
    HttpClientModule,

    // AQUI A??ADIMOS LOS 2 MODULES QUE HICIMOS NUEVOS

    // ESTOS MODULES HAN SIDO COMENTADO YA QUE SE EST??N CARGANDO A TRAV??S DEL MODULO "app-route.module.ts"
    // USANDO EL ACERCAMIENTO DE "Lazy Loading"
    // RecipesModule,
    // ShoppingListModule,

    // EL "SharedModule" ES EL CREADO EN EL ARCHIVO "shared.module.ts"
    SharedModule,

    // EL "CoreModule" ES EL CREADO EN EL ARCHIVO "core.module.ts", SE SUPONE QUE DEBE CONTENER
    // EL MISMO CONTENIDO QUE TEN??A LA PROPIEDAD "providers" DE ESTE ARCHIVO "app.module.ts"
    CoreModule,

    // EL "AuthModule" ES EL CREADO EN EL ARCHIVO "auth.module.ts", SE SUPONE QUE DEBE CONTENER
    // ESTE MODULE SE COMENT?? YA QUE SE EST?? USANDO A TRAV??S DEL MODULE "app-route.module.ts"
    // USANDO EL ACERCAMIENTO DE "Lazy Loading"
    // AuthModule

    // EL "forRoot" ES USADO AC?? PARA SETEAR UN JSON CON:
    // 1.- UN IDENTIFICADOR PARA EL REDUCER A USAR
    // 2.- EL REDUCER A USAR
    // EL "StoreModule" FUE COMENTADO DEBIDO A LA CREACI??N DEL STORE GLOBAL "app.reducer.ts"
    // StoreModule.forRoot({shoppingList: shoppingListReducer, auth: authReducer})

    // DE ESTA FORMA SETEAMOS NUESTRO STORE GLOBAL
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipesEffect]),

    // DE ESTA MANERA LE DECIMOS AL "StoreDevtoolsModule" EN EL NAVEGADOR 
    // QUE SOLO QUEREMOS QUE MUESTRE LOS MENSAJES DE PRODUCCI??N
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot(),

    // ESTO ES PARA LAS ANIMACIONES DE ANGULAR
    BrowserAnimationsModule
  ],
  providers: [
    // ESTO SE COMENT?? YA QUE AHORA SE COMENZAR?? A USAR A TRAV??S DEL ARCHIVO "core.module.ts"
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}
  ],
  // DEBIDO A QUE USAMOS EL "provideIn: root" DENTRO DE CADA SERVICIO, YA NO ES NECESARIO DECLARARLOS
  // DENTRO DE LA PROPIEDAD DE "providers", ANTES ESTABA DENTRO EL SERVICIO "RecipeService"
  bootstrap: [AppComponent]
})
export class AppModule { }
