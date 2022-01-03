import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { AddTaskComponent } from './add-task.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddTaskComponent],
  imports: [
    CommonModule, IonicModule, FormsModule
  ],
  exports: [AddTaskComponent]
})
export class AddTaskComponentModule { }
