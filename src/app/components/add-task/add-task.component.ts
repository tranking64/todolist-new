import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FireserviceService } from 'src/app/services/fireservice.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {

  public title: string;
  public description: string;

  constructor(private modalCtrl: ModalController, private serivce: FireserviceService, private alertCtrl: AlertController) { }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Unvalid input!',
      message: 'Please give your new task at least a title!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  async addTask() {
    // allow description to be empty
    if(this.description == null) {
      this.description = '';
    }

    if(this.title != null) {
      this.serivce.currTask.title = this.title;
      this.serivce.currTask.description = this.description;

      try {
        this.serivce.createTask();
        await this.closeModal();
      }
      catch (e) {
        this.presentAlert();
      }
    }
    else {
      this.presentAlert();
    }
  }

  ngOnInit() {}

}
