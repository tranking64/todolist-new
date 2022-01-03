import { Component, OnInit } from '@angular/core';
import { FireserviceService } from 'src/app/services/fireservice.service';

@Component({
  selector: 'app-forgotpw',
  templateUrl: './forgotpw.page.html',
  styleUrls: ['./forgotpw.page.scss'],
})
export class ForgotpwPage {

  public email: string;

  constructor(private service: FireserviceService) { }

  forgotPassword() {
    this.service.resetPassword(this.email);
  }
}
