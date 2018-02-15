import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, emailValid()]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validator: missmatchedFields('password', 'confirmPassword')});
  }

  ngOnInit() {
  }

  onSumbit() {
    this.authService.register(this.form.value);
  }
}

function missmatchedFields(field1, field2) {
  return form => {
    if (form.controls[field1].value !== form.controls[field2].value) {
      return {missmatchedFields: true};
    }
  };
}

function emailValid() {
  return control => {
    const regex = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/;

    return regex.test(control.value) ? null : {invalidEmail: true};
  };
}
