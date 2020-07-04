import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  regForm: FormGroup;
  accountValue = {
    
  }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email:['', [Validators.required, Validators.email]]
    })
  }

  get username() {
    return this.regForm.get('username');
  }

  get password() {
    return this.regForm.get('password');
  }

  get email() {
    return this.regForm.get('email');
  }

  submitForm() {
    //async
    console.log(this.regForm)
  }
  
}
