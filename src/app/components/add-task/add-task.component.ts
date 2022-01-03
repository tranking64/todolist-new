import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format, parseISO} from 'date-fns';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {

  public dateValue;
  public title;

  constructor(private modalCtrl: ModalController) { }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }

  async addTask() {
    console.log(this.title);
    //TODO implement add task
    await this.closeModal();
  }

  ngOnInit() {}

}
