import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Business, CompanyBranchResponse } from '../business';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

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
  public standAdd(branchId: string, count: string) {
    const body = { branchId: branchId, count: count };
    this.http.post(
      `${this.apiServerUrl}/api/v1/company/branch/stand/add`,
      body
    );
  }

  // public getUsers(): Observable<Business[]> {
  //   return this.http.get<Business[]>(`${this.apiServerUrl}/users`);
  // }
}