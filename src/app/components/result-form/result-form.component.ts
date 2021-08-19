import { Component, Input, OnInit } from '@angular/core';
import { shortURL } from 'src/app/models/short-url';

@Component({
  selector: 'app-result-form',
  templateUrl: './result-form.component.html',
  styleUrls: ['./result-form.component.css'],
})
export class ResultFormComponent implements OnInit {
  constructor() {}

  @Input() shortURL: Partial<shortURL> = {};

  ngOnInit(): void {
    console.log('XDDDDDDD');
  }
}
