import { Component } from '@angular/core';
import { longURL } from './models/long-url';
import { shortURL } from './models/short-url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'SHORTEN URL';
}
