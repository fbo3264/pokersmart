import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GtoCalculatorPageRoutingModule } from './gto-calculator-routing.module';

import { GtoCalculatorPage } from './gto-calculator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GtoCalculatorPageRoutingModule
  ],
  declarations: [GtoCalculatorPage]
})
export class GtoCalculatorPageModule {}
