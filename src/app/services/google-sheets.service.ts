import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeConstructionData } from '../models/home-construction.model';

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService {
  private readonly URL: string = 'https://sheetdb.io/api/v1/9qr8nne893t4g';

  constructor(private readonly httpClient: HttpClient) {}

  public getAllDataFromHomeConstructionSheet(): Observable<HomeConstructionData[]> {
    return this.httpClient.get<HomeConstructionData[]>(this.URL);
  }

  public createRecord(data: HomeConstructionData): Observable<any> {
    return this.httpClient.post(this.URL, data);
  }
}