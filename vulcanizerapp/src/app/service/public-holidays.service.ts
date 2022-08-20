import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PublicHolidaysService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /**
   * pushNew
   */
  public pushNew(body: PublicHolidays): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${this.apiServerUrl}/api/v1/public_holidays`,
      body
    );
  }

  /**
   * delete
   */
  public delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(
      `${this.apiServerUrl}/api/v1/public_holidays/${id}`
    );
  }

  /**
   * pullCurentYear
   */
  public pullCurentYear(): Observable<HttpResponse<PublicHolidays[]>> {
    return this.http.get<PublicHolidays[]>(
      `${this.apiServerUrl}/api/v1/public_holidays/currentYear`,
      { observe: 'response' }
    );
  }

  /**
   * pullNextYear
   */
  public pullNextYear(): Observable<HttpResponse<PublicHolidays[]>> {
    return this.http.get<PublicHolidays[]>(
      `${this.apiServerUrl}/api/v1/public_holidays/nextYear`,
      { observe: 'response' }
    );
  }

  /**
   * pullNextTwoMonths
   */
  public pullNextTwoMonths(): Observable<HttpResponse<PublicHolidays[]>> {
    return this.http.get<PublicHolidays[]>(
      `${this.apiServerUrl}/api/v1/public_holidays/nextMonths`,
      { observe: 'response' }
    );
  }
}

export class PublicHolidays {
  id: string = '';
  date: string = '';
  name: string = '';
  everyYear: boolean = false;
}
