import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../models/Recipe';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes$ = new BehaviorSubject<Recipe[]>([]);

  constructor(private http: HttpClient) {}

  getRecipes() {
    this.http.get('http://localhost:3000/api/recipes').subscribe(
      (recipes: Recipe[]) => {
        this.recipes$.next(recipes);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSingleRecipe(id: string) {
    return this.http.get('http://localhost:3000/api/recipes/' + id);
  }

  saveRecipe(recipe: Recipe) {
    return this.http.post('http://localhost:3000/api/recipes', recipe);
  }

  modifyRecipe(id: string, recipe: Recipe) {
    return this.http.put('http://localhost:3000/api/recipes/' + id, recipe);
  }

  deleteRecipe(id: string) {
    return this.http.delete('http://localhost:3000/api/recipes/' + id);
  }
}
