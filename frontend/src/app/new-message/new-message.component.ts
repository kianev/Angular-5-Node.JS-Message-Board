import { Component, OnInit } from '@angular/core';
import {WebService} from '../web.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {
 message = {
   owner: '',
   text: ''
 };
  constructor(private webService: WebService) { }

  ngOnInit() {
  }

  post() {
    this.webService.postMessage(this.message);
  }

}
