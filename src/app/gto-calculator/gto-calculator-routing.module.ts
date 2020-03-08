import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GtoCalculatorPage } from './gto-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: GtoCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GtoCalculatorPageRoutingModule {}
