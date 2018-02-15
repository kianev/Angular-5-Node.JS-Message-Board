import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { MatSnackBar } from '@angular/material';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class WebService {
  constructor(private httpClient: HttpClient, private sb: MatSnackBar) {}
  BASE_URL = 'http://localhost:63145/api';

  private messages;
  messageSubject = new Subject();

  getMessages(user) {
   // return this.httpClient.get('http://localhost:1234/messages').toPromise();
     user = (user) ? '/' + user : '';
     this.httpClient.get(this.BASE_URL + '/messages' + user)
      .subscribe(
        webMessages => {
            this.messages = webMessages;
            this.messageSubject.next(webMessages);
        },
        error => this.handleError('Unable to get messages'));
  }

  postMessage(message) {
     this.httpClient.post(this.BASE_URL + '/messages', message)
       .subscribe(
         response => this.messages.push(response),
         error => this.handleError('Unable to post the message'));
  }

  getUser() {
    return this.httpClient.get(this.BASE_URL + '/users/me').subscribe();
  }

  private handleError(error) {
    console.log(error);
    this.sb.open(error, 'close', {duration: 3000});
  }
}
