import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LinksData } from '../models/links-data';

@Injectable({
  providedIn: 'root',
})
export class LinksDataService {
  constructor(private httpClient: HttpClient) {}

  private readonly API_URL: string =
    'https://api-ssl.bitly.com/v4/groups/Bl8jbs1dpSx/bitlinks';

  findAll(size: number, page: number): Observable<LinksData> {
    let header = {
      Authorization: environment.API_KEY,
      'Content-Type': 'application/json',
    };

    let params = new HttpParams();
    params = params.append('size', String(size));
    params = params.append('page', String(page));

    return this.httpClient
      .get<LinksData>(this.API_URL, { headers: header, params: params })
      .pipe(
        map((linksData: LinksData) => linksData),
        catchError((err) => throwError(err))
      );
  }
}
