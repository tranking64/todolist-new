import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FireserviceService } from '../services/fireservice.service';

interface Task {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  tasks: Task[];

  constructor(private service: FireserviceService) {}

  // this method will be executed if the page was navigated to
  ionViewWillEnter() {
    this.service.readDoneTasks().subscribe((res) => {
      // converts/maps firebase-entries to the class "Task"
      this.tasks = res.map((t) => ({
          id: t.payload.doc.id,
          ...t.payload.doc.data() as Task
        }));
    });
  }

  // method to delete a completed task
  deleteTask(task: Task) {
    this.service.deleteTask(task.id);
  }
}
