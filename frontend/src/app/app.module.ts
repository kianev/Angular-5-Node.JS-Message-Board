import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatInputModule, MatSnackBarModule, MatToolbarModule} from '@angular/material';
import {WebService} from './web.service';
import {HttpClientModule} from '@angular/common/http';
import { NewMessageComponent } from './new-message/new-message.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from './auth.service';

const routes = [
  {path: '', component: HomeComponent},
  {path: 'messages', component: MessagesComponent},
  {path: 'messages/:name', component: MessagesComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    NewMessageComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCardModule, MatInputModule, MatSnackBarModule, MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [WebService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
