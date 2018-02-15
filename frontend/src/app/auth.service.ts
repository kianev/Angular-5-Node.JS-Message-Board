import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {
  BASE_URL = 'http://localhost:63145/auth';

  constructor(private httpClient: HttpClient) { }

  register(user) {
    delete user.confirmPassword;
    this.httpClient.post(this.BASE_URL + '/register', user).subscribe();
  }
}
