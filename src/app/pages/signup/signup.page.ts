import { Component, OnInit } from '@angular/core';
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

  constructor(private service: FireserviceService) { }

  signup() {
    //TODO implement good pw check
    if(this.password === this.rePassword) {
      this.service.signup(this.email, this.rePassword);
    }
  }

  ngOnInit() {
  }

}
