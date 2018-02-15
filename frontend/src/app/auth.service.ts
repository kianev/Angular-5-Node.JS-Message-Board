import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  BASE_URL = 'http://localhost:63145/auth';
  response;

  constructor(private httpClient: HttpClient, private router: Router) { }

  get name() {
    return localStorage.getItem('name');
  }

  get isAuthenticated() {
    return !!localStorage.getItem('token'); // double negative returns true or false
  }

  register(user) {
    delete user.confirmPassword;
    this.httpClient.post(this.BASE_URL + '/register', user)
      .subscribe(res => this.authenticate(res));
  }

  login(loginData) {
    this.httpClient.post(this.BASE_URL + '/login', loginData)
      .subscribe(res => this.authenticate(res));
  }

  logout() {
      localStorage.removeItem('name');
      localStorage.removeItem('token');
  }

  authenticate(res) {
    this.response = res;

    if (!this.response.token) {
      return;
    }
    localStorage.setItem('token', this.response.token);
    localStorage.setItem('name', this.response.firstName);
    this.router.navigate(['/']);
  }
}
