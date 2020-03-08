import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'gto-calculator', pathMatch: 'full'},
    // {
    //     path: 'gto-calculator',
    //     children: [
    //         {path: '', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesPageModule)},
    //         {
    //             path: ':recipeId',
    //             loadChildren: () => import('./recipes/recipe-detail/recipe-detail.module').then(m => m.RecipeDetailPageModule)
    //         },
    //     ]
    // },
  {
    path: 'gto-calculator',
    loadChildren: () => import('./gto-calculator/gto-calculator.module').then( m => m.GtoCalculatorPageModule)
  },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
