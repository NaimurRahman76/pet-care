import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedStatus = new BehaviorSubject<boolean>(false);
  private usernameSubject = new BehaviorSubject<string | null>(null);

  // Initialize
  constructor() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
    this.isAuthenticatedStatus.next(isLoggedIn);
    this.usernameSubject.next(username);
  }

  login(username: string, password: string): boolean {
    // Example validation
    const validUsername = 'naimur76'; 
    const validPassword = 'admin';

    if (username === validUsername && password === validPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      this.isAuthenticatedStatus.next(true);
      this.usernameSubject.next(username);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    this.isAuthenticatedStatus.next(false);
    this.usernameSubject.next(null);
  }

  isAuthenticated() {
    return this.isAuthenticatedStatus.asObservable();
  }

  getUsername() {
    return this.usernameSubject.asObservable();
  }
}
