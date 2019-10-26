import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/Recipe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  id: string;
  mode: string;
  recipe: Recipe;
  recipeForm: FormGroup;
  errorMessage: string;
  loading: boolean;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    if (this.route.snapshot.url[0].path === 'new-recipe') {
      this.mode = 'new';
      this.recipeForm = this.formBuilder.group({
        title: [null, Validators.required],
        ingredients: [null, Validators.required],
        instructions: [null, Validators.required],
        difficulty: [null, [Validators.required, Validators.max(5)]],
        time: [null, Validators.required]
      });
      this.loading = false;
    } else {
      this.loading = true;
      this.mode = 'modify';
      this.route.params.subscribe(
        (params) => {
          this.id = params.id;
          this.recipeService.getSingleRecipe(this.id).subscribe(
            (recipe: Recipe) => {
              this.recipe = recipe;
              this.recipeForm = this.formBuilder.group({
                title: [recipe.title, Validators.required],
                ingredients: [recipe.ingredients, Validators.required],
                instructions: [recipe.instructions, Validators.required],
                difficulty: [recipe.difficulty, Validators.required],
                time: [recipe.time, Validators.required]
              });
              this.loading = false;
            }
          );
        }
      );
    }
  }

  onSubmit() {
    this.loading = true;
    this.errorMessage = null;
    const newRecipe = new Recipe();
    newRecipe.title = this.recipeForm.get('title').value;
    newRecipe.instructions = this.recipeForm.get('instructions').value;
    newRecipe.ingredients = this.recipeForm.get('ingredients').value;
    newRecipe.time = this.recipeForm.get('time').value;
    newRecipe.difficulty = this.recipeForm.get('difficulty').value;
    if (this.mode === 'new') {
      this.recipeService.saveRecipe(newRecipe).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.loading = false;
          this.errorMessage = error.message;
        }
      );
    } else if (this.mode === 'modify') {
      this.recipeService.modifyRecipe(this.recipe._id, newRecipe).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.loading = false;
          this.errorMessage = error.message;
        }
      );
    }
  }

}
