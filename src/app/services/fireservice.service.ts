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
    email: '',
    password: '',
    uid: ''
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
    // use firebase sign in method
    this.auth.signInWithEmailAndPassword(this.currUser.email, this.currUser.password)
      // if sign in was successful --> navigate into the app homescreen
      .then(async () => {
        this.router.navigate(['/tabs/tab2']);
        // get current userid to be able to add tasks to this specific user
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

        // navigate back to login screen
        this.router.navigate(['login']);
      });
  }

  createTask() {
    // calls firebase method to create an entry in firestore databasee
    this.store.collection(this.currUser.uid).add(this.currTask);
  }

  // get all tasks which were completed
  readDoneTasks() {
    return this.store.collection(this.currUser.uid, ref => ref.where('done', '==', true)).snapshotChanges();
  }

  // get all tasks which are not completed
  readUndoneTasks() {
    return this.store.collection(this.currUser.uid, ref => ref.where('done', '==', false)).snapshotChanges();
  }

  // method to update an todo-entry; specially used to mark a task as "done"
  updateTask(id, task: Task) {
    this.store.collection(this.currUser.uid).doc(id).update(task);
  }

  // method to delete a specific task
  deleteTask(id) {
    this.store.doc(this.currUser.uid + '/' + id).delete();
  }

  // method to create an account
  signup(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        // navigate to login-page to enter credentials
        this.router.navigate(['login']);
        // shows a message that account was created
        this.presentToast();
      })
      .catch(e => this.presentAlert());
  }

  resetPassword(email: string) {
    this.auth.sendPasswordResetEmail(email)
      .then(() => {
        this.router.navigate(['login']);
        // shows a message that the user receives an email very soon
        this.presentPWToast();
      })
      .catch(e => this.presentAlert());
  }
}
