import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LongURL } from '../models/long-url';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ShortURL } from '../models/short-url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UrlShortenerService {
  constructor(private httpClient: HttpClient) {}

  private readonly API_URL: string = 'https://api-ssl.bitly.com/v4/shorten';

  shortenLink(link: string): Observable<ShortURL> {
    let header = {
      Authorization: environment.API_KEY,
      'Content-Type': 'application/json',
    };
    let longURL: LongURL = {
      long_url: link,
      domain: 'bit.ly',
    };

    return this.httpClient
      .post<ShortURL>(this.API_URL, longURL, {
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
