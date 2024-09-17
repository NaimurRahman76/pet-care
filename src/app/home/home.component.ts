import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'pet-care';
  isLoggedIn = false;
  username: string | null = '';

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.cdr.detectChanges(); 
    });

    this.authService.getUsername().subscribe(username => {
      this.username = username;
      this.cdr.detectChanges(); 
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
