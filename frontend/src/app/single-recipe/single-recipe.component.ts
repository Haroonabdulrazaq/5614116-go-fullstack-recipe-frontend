import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.scss']
})
export class SingleRecipeComponent implements OnInit {
  loading: boolean;
  recipe: Recipe;
  errorMessage: string;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.recipeService.getSingleRecipe(params.id).subscribe(
          (recipe: Recipe) => {
            this.recipe = recipe;
          }
        );
      }
    );
  }

  onModify() {
    this.router.navigate(['/recipe', 'edit', this.recipe._id]);
  }

  onDelete() {
    this.loading = true;
    this.recipeService.deleteRecipe(this.recipe._id).subscribe(
      () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

}
