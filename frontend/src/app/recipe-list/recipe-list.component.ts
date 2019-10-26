import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Subscription } from 'rxjs';
import { Recipe } from '../models/Recipe';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  recipes$: Subscription;
  loading: boolean;

  constructor(private recipe: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.recipes$ = this.recipe.recipes$.subscribe(
      (recipes) => {
        this.recipes = recipes;
        this.loading = false;
      }
    );
    this.recipe.getRecipes();
  }

  onOpenRecipe(id: string) {
    this.router.navigate(['recipe', id]);
  }

}
