import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { longURL } from '../models/long-url';
import { shortURL } from '../models/short-url';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UrlShortenerService {
  private readonly API_URL: string = 'https://api-ssl.bitly.com/v4/shorten';
  private readonly API_KEY: string =
    'Bearer d4e2c4d329b15e5f486a2d8ee07cd98656906acd';

  constructor(private httpClient: HttpClient) {}

  shortenLink(link: string): Observable<shortURL> {
    let header = {
      Authorization: this.API_KEY,
      'Content-Type': 'application/json',
    };
    let longURL: longURL = {
      long_url: link,
      domain: 'bit.ly',
    };

    return this.httpClient
      .post<shortURL>(this.API_URL, longURL, {
        headers: header,
      })
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
