import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../src/app/services/auth.service';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, OnInit } from '@angular/core';
import { HomeComponent } from "./home/home.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
