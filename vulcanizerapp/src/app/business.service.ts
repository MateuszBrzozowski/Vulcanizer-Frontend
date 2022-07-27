import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { Business } from "./business";

@Injectable({
    providedIn: 'root'
  })
  export class BusinessService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }

    public getRecommendBusiness() : Observable<Business[]> {
        return this.http.get<Business[]>(`${this.apiServerUrl}/api/v1/business/recommend`)
    }
  
    // public getUsers(): Observable<Business[]> {
    //   return this.http.get<Business[]>(`${this.apiServerUrl}/users`);
    // }
  }
  