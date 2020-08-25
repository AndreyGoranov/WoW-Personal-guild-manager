import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from "firebase/app";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private ngZone: NgZone) { }

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('user logged in ');
        console.log(user);
        this.succesfulLogin(user);
      } else {
        console.log('user logged out');
      }
    })
  } 

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      const user = result.user;
      console.log(user.displayName);
      console.log(user);
    })
  }

  emailLogin() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).
    catch(error => this.unsuccesfulLogin(error));
  }

  register() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password).
    catch(error => this.unsuccesfulLogin(error));;
  
  }

  succesfulLogin(user) {
    console.log(user)
    console.log('success');
    this.ngZone.run(() => this.router.navigateByUrl('entrance'));
  }

  unsuccesfulLogin(error) {
    console.log(error.message);
  }

  get email() {
    return this.loginForm.get('email'); 
  }

  get password() {
    return this.loginForm.get('password');
  }


  
}
