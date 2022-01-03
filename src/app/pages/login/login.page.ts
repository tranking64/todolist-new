import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email = '';
  public password = '';

  constructor(public auth: AngularFireAuth, public router: Router) { }

  login() {
    this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.router.navigate(['/tabs/tab2']);
      }).catch(error => {
        console.log('An error occured');
      });
  }

  ngOnInit() {
  }

}
