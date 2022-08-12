import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Business, CompanyBranchResponse } from './business';

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

  // public getUsers(): Observable<Business[]> {
  //   return this.http.get<Business[]>(`${this.apiServerUrl}/users`);
  // }
}
