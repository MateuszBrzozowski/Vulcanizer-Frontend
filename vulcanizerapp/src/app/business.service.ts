import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Business } from "./business";

@Injectable({
    providedIn: 'root'
  })
  export class BusinessService {
    private apiServerUrl = 'http://localhost:8080';
  
    constructor(private http: HttpClient) { }

    public getRecommendBusiness() : Observable<Business[]> {
        return this.http.get<Business[]>(`${this.apiServerUrl}/business/recommend`)
    }
  
    // public getUsers(): Observable<Business[]> {
    //   return this.http.get<Business[]>(`${this.apiServerUrl}/users`);
    // }
  }
  