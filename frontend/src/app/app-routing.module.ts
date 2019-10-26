import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { SingleRecipeComponent } from './single-recipe/single-recipe.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';

const appRoutes: Routes = [
  { path: 'recipe/:id', component: SingleRecipeComponent },
  { path: 'new-recipe', component: RecipeFormComponent },
  { path: 'recipe/edit/:id', component: RecipeFormComponent },
  { path: '', component: RecipeListComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
