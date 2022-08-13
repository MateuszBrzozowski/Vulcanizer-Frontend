import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin, User, UserRegister } from '../users';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginComponent } from '../login/login.component';
import { CompanyBranchResponse, UserCompanyBranch } from '../business';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiServerUrl = environment.apiBaseUrl;
  private token: string = '';
  private scId: string = '';
  private scProperties: string = '';
  private loggedInUsername: string = '';
  private hasCompany: string = '';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  public login(user: UserLogin): Observable<HttpResponse<any>> {
    return this.http.post<User>(`${this.apiServerUrl}/users/login`, user, {
      observe: 'response',
    });
  }

  public register(user: UserRegister): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/users/register`, user);
  }

  public logOut(): void {
    this.token = '';
    this.scId = '';
    this.scProperties = '';
    this.loggedInUsername = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('scid');
    localStorage.removeItem('scproperties');
    localStorage.removeItem('users');
    localStorage.removeItem('compBranches');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public saveScId(scId: string): void {
    this.scId = scId;
    localStorage.setItem('scid', scId);
  }

  public saveScProperties(scProperties: string): void {
    this.scProperties = scProperties;
    localStorage.setItem('scproperties', scProperties);
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCahce(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  public getCompanyBranchesFromLocalStorage(): CompanyBranchResponse[] {
    return JSON.parse(localStorage.getItem('compBranches')!);
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token')!;
  }

  public loadScId(): void {
    this.scId = localStorage.getItem('scid')!;
  }

  public loadScProperties(): void {
    this.scProperties = localStorage.getItem('scproperties')!;
  }

  public loadHasCompany(): void {
    this.hasCompany = localStorage.getItem('isCompany')!;
  }

  public getToken(): string {
    return this.token;
  }

  public getScId(): string {
    return this.scId;
  }

  public getScProperties(): string {
    return this.scProperties;
  }

  public isLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
    this.logOut();
    return false;
  }

  /**
   * isCompanyActive
   */
  public isCompanyActive(): boolean {
    if (this.isLoggedIn()) {
      this.loadHasCompany();
      if (this.hasCompany == 'true') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public isAdmin(): boolean {
    if (this.isSuperAdmin()) {
      return true;
    } else {
      //TODO in future another auth check
      return false;
    }
  }

  public isSuperAdmin(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).Authorities != null || '') {
        const auth: string[] = this.jwtHelper.decodeToken(
          this.token
        ).Authorities;
        for (let index = 0; index < auth.length; index++) {
          if (auth[index] === 'super:admin') {
            return true;
          }
        }
      }
    }
    return false;
  }
}
