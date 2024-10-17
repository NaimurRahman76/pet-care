import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedStatus = new BehaviorSubject<boolean>(false);
  private emailSubject = new BehaviorSubject<string | null>(null);
  private usernameSubject = new BehaviorSubject<string | null>(null);
  private apiUrl = 'https://localhost:7088/api/auth'; 

  constructor(private http: HttpClient) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('email');
    const username = localStorage.getItem('username'); 
    this.isAuthenticatedStatus.next(isLoggedIn);
    this.emailSubject.next(email); 
    this.usernameSubject.next(username); 
  }

  signup(userName: string, email: string, gender: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, { userName, email, gender, password }, { withCredentials: true }).pipe(
      catchError(error => {
        console.error('Signup failed', error);
        throw error; 
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true }).pipe(
      catchError(error => {
        console.error('Login failed', error);
        throw error; 
      })
    );
  }
  refreshAccessToken() {
    return this.http.post('https://localhost:7088/api/auth/refresh-token', { withCredentials: true })
      .pipe(
        tap((response: any) => {
          // The new access token is automatically stored in HttpOnly cookie by the server
          console.log('Access token refreshed successfully');
        })
      );
  }
  handleLoginResponse(response: any): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', response.email); 
    localStorage.setItem('username', response.name); 
    localStorage.setItem('token', response.token); 
    this.isAuthenticatedStatus.next(true);
    this.emailSubject.next(response.email);
    this.usernameSubject.next(response.name);
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe();

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email'); 
    localStorage.removeItem('username'); 
    localStorage.removeItem('token'); 
    this.isAuthenticatedStatus.next(false);
    this.emailSubject.next(null);
    this.usernameSubject.next(null);
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<{ isAuthenticated: boolean }>(`${this.apiUrl}/IsAuthenticated`, { withCredentials: true })
    .pipe(
      map(response => response.isAuthenticated),
      catchError(error => {
        // If the request fails, treat it as not authenticated
        console.error('Authentication check failed:', error);
        return of(false);
      })
    );
  }

  getEmail(): Observable<string | null> {
    return this.emailSubject.asObservable();
  }

  getUsername(): Observable<string | null> { 
    return this.usernameSubject.asObservable();
  }
}
