import { Component } from '@angular/core';
import { LongURL } from './models/long-url';
import { ShortURL } from './models/short-url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'SHORTEN URL';
}
