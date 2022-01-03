import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddTaskComponent } from '../components/add-task/add-task.component';
import { FireserviceService } from '../services/fireservice.service';
import { ToastController } from '@ionic/angular';

interface Task {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  tasks: Task[];

  constructor(private modalCtrl: ModalController, private service: FireserviceService, private toastCtrl: ToastController) {}

  async presentToast() {
    const toast = await this.toastCtrl.create({
      color: 'success',
      message: 'Task completed!',
      duration: 500
    });
    toast.present();
  }

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: AddTaskComponent
    });
    await modal.present();
  }

  ionViewWillEnter() {
    this.service.readUndoneTasks().subscribe((res) => {
      this.tasks = res.map((t) => ({
          id: t.payload.doc.id,
          ...t.payload.doc.data() as Task
        }));
    });
  }

  completeTask(task: Task) {
    this.service.updateTask(task.id, {
      title: task.title,
      description: task.description,
      done: task.done
    });
    this.presentToast();
  }

  ngOnInit() {
  }
}
