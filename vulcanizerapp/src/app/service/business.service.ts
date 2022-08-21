import { HttpClient, HttpResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Business, CompanyBranchResponse, OpeningHours, Stand } from '../business';
import { CustomOpeningHours } from './customOpeningHours';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  private apiServerUrl = environment.apiBaseUrl;
  private dataSourceStand: Stand[] = new Array<Stand>;

  constructor(private http: HttpClient) { }

  public getRecommendBusiness(): Observable<Business[]> {
    return this.http.get<Business[]>(
      `${this.apiServerUrl}/api/v1/public-data/business/recommend`
    );
  }

  /**
   * getAllWaitnigCompanyBranch
   */
  public getAllWaitnigCompanyBranch(): Observable<
    HttpResponse<CompanyBranchResponse[]>
  > {
    return this.http.get<CompanyBranchResponse[]>(
      `${this.apiServerUrl}/api/v1/company/branch/waiting`,
      { observe: 'response' }
    );
  }

  /**
   * accept
   */
  public accept(companyBranchId: string): Observable<HttpResponse<any>> {
    const body = {};
    return this.http.put<HttpResponse<any>>(
      `${this.apiServerUrl}/api/v1/company/branch/${companyBranchId}/accept`,
      body
    );
  }

  /**
   * decline
   */
  public decline(companyBranchId: string): Observable<HttpResponse<any>> {
    const body = {};
    return this.http.put<HttpResponse<any>>(
      `${this.apiServerUrl}/api/v1/company/branch/${companyBranchId}/decline`,
      body
    );
  }

  /**
   * standAdd
   */
  public standAdd(branchId: string, count: string): Observable<HttpResponse<Stand[]>> {
    const body = {};
    return this.http.post<Stand[]>(
      `${this.apiServerUrl}/api/v1/company/branch/${branchId}/stand/${count}`,
      body, { observe: 'response' }
    );
  }

  /**
   * standRemove
   */
  public standRemove(branchId: string, number: string): Observable<HttpResponse<Stand[]>> {
    return this.http.delete<Stand[]>(
      `${this.apiServerUrl}/api/v1/company/branch/${branchId}/stand/${number}`, { observe: 'response' }
    );
  }

  /**
   * saveStands
   */
  public saveStands(body: Stand[]) {
    this.dataSourceStand = body;
  }

  /**
   * getSavedStands
   */
  public getSavedStands(): Stand[] {
    return this.dataSourceStand;
  }

  /**
   * standsFindAll
   */
  public getAllStands(branchId: string): Observable<HttpResponse<Stand[]>> {
    return this.http.get<Stand[]>(
      `${this.apiServerUrl}/api/v1/company/branch/${branchId}/stand`,
      { observe: 'response' }
    );
  }

  /**
   * pullHoursOpening
   */
  public pullHoursOpening(branchId: string): Observable<HttpResponse<OpeningHours[]>> {
    return this.http.get<OpeningHours[]>(
      `${this.apiServerUrl}/api/v1/company/branch/${branchId}/hours`,
      { observe: 'response' }
    );
  }

  /**
   * pushHoursOpening
   */
  public pushHoursOpening(branchId: string, openingHours: OpeningHours[]): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.apiServerUrl}/api/v1/company/branch/${branchId}/hours`, openingHours);
  }

  /**
   * pullCustomHoursOpening
   */
  public pullCustomHoursOpening(branchId: string): Observable<HttpResponse<CustomOpeningHours[]>> {
    return this.http.get<CustomOpeningHours[]>(
      `${this.apiServerUrl}/api/v1/company/branch/${branchId}/hours/custom`,
      { observe: 'response' });
  }

  /**
   * removeCustomOpeningHours
   */
  public removeCustomOpeningHours(
    companyBranchId: string,
    custOpeningHoursId: string): Observable<HttpResponse<CustomOpeningHours[]>> {
    return this.http.delete<CustomOpeningHours[]>(
      `${this.apiServerUrl}/api/v1/company/branch/${companyBranchId}/hours/custom/${custOpeningHoursId}`,
      { observe: 'response' });
  }

  /**
   * pushNewCustomOpeningHours
   */
  public pushNewCustomOpeningHours(
    companyBranchId : string, 
    body : CustomOpeningHours) : Observable<HttpResponse<CustomOpeningHours[]>> {
      return this.http.post<CustomOpeningHours[]>(
        `${this.apiServerUrl}/api/v1/company/branch/${companyBranchId}/hours/custom`,
        body, 
        {observe : 'response'});
  }

  // public getUsers(): Observable<Business[]> {
  //   return this.http.get<Business[]>(`${this.apiServerUrl}/users`);
  // }
}
