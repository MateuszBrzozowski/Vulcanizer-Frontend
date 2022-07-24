import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = '';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/users`)
  }
}
