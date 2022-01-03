import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddTaskComponent } from '../components/add-task/add-task.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private modalCtrl: ModalController) {}

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: AddTaskComponent
    });
    await modal.present();
  }
}
