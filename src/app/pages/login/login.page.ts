import { Component, OnInit } from '@angular/core';
import { FireserviceService } from 'src/app/services/fireservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email: string;
  public password: string;

  constructor(public service: FireserviceService) {}

  login() {
    this.service.currUser.email = this.email;
    this.service.currUser.password = this.password;

    this.service.login();
  }

  ionViewDidLeave() {
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
  }

}
