import {Component, OnInit} from '@angular/core';
import {WebService} from '../web.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  constructor(private webService: WebService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const name = this.activatedRoute.snapshot.params.name;
    this.webService.getMessages(name);
  }

}
