import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FireserviceService } from 'src/app/services/fireservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public email: string;
  public password: string;
  public rePassword: string;

  constructor(private service: FireserviceService, private alertCtrl: AlertController) { }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Unvalid password!',
      message: 'Passwords do not match! Please try again!',
      buttons: ['OK']
    });
    await alert.present();
  }

  signup() {
    // check if entered passwords are the same
    if (this.password === this.rePassword) {
      this.service.signup(this.email, this.rePassword);
    }
    else {
      this.presentAlert();
    }
  }

  ngOnInit() {
  }

}
