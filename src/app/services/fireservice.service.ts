import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AlertController, ToastController } from '@ionic/angular';
import { TestBed } from '@angular/core/testing';

interface User {
  email: string;
  password: string;
  uid: string;
}

interface Task {
  title: string;
  description: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FireserviceService {

  public currUser: User = {
    email: 'f.treber@htlkrems.at',
    password: 'fabian2003',
    uid: 'SF3NHIu2uFRVl6EoqmiZ7BVSuh73'
  };

  public currTask: Task = {
    title: '',
    description: '',
    done: false
  };

  taskCollection: AngularFirestoreCollection<Task>;

  constructor(private auth: AngularFireAuth, public router: Router,
    private store: AngularFirestore, private alertCtrl: AlertController, private toastCtrl: ToastController) { }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Unvalid email!',
      message: 'Please check your entered data again!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentPWToast() {
    const toast = await this.toastCtrl.create({
      color: 'warning',
      message: 'A password reset-link was sent. Please check your email!',
      duration: 3000
    });
    toast.present();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      color: 'success',
      message: 'Account successfully created! You can now login!',
      duration: 1500
    });
    toast.present();
  }

  login() {
    this.auth.signInWithEmailAndPassword(this.currUser.email, this.currUser.password)
      .then(async () => {
        this.router.navigate(['/tabs/tab2']);
        this.currUser.uid = (await this.auth.currentUser).uid;
      })
      .catch(e => this.presentAlert());
  }

  logout() {
    this.auth.signOut()
      .then(() => {
        this.currUser.email = '';
        this.currUser.password = '';
        this.currUser.uid = '';

        this.router.navigate(['login']);
      });
  }

  createTask() {
    this.store.collection(this.currUser.uid).add(this.currTask);
  }

  readDoneTasks() {
    return this.store.collection(this.currUser.uid, ref => ref.where('done', '==', true)).snapshotChanges();
  }

  readUndoneTasks() {
    return this.store.collection(this.currUser.uid, ref => ref.where('done', '==', false)).snapshotChanges();
  }

  updateTask(id, task: Task) {
    this.store.collection(this.currUser.uid).doc(id).update(task);
  }

  deleteTask(id) {
    this.store.doc(this.currUser.uid + '/' + id).delete();
  }

  signup(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['login']);
        this.presentToast();
      })
      .catch(e => this.presentAlert());
  }

  resetPassword(email: string) {
    this.auth.sendPasswordResetEmail(email)
      .then(() => {
        this.router.navigate(['login']);
          this.presentPWToast();
      })
      .catch(e => this.presentAlert());
  }
}
