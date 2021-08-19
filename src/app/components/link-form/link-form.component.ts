import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { longURL } from 'src/app/models/long-url';
import { shortURL } from 'src/app/models/short-url';
import { UrlShortenerService } from 'src/app/services/url-shortener.service';

@Component({
  selector: 'app-link-form',
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.css'],
})
export class LinkFormComponent implements OnDestroy {
  constructor(private urlShortenerService: UrlShortenerService) {}

  shortURL: Partial<shortURL> = {};
  longLink: Partial<longURL> = {};
  error: string = '';
  subscription: Subscription = new Subscription();

  submitForm() {
    this.error = '';
    this.subscription = this.urlShortenerService
      .shortenLink(this.longLink.long_url || '')
      .subscribe(
        (data: shortURL) =>
          (this.shortURL = {
            link: data.link,
            id: data.id,
            long_url: data.long_url,
          }),
        (error) => {
          this.error = error;
        },
        () => console.log('POST request completed.')
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
