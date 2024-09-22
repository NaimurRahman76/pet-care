import { Component ,NgModule} from '@angular/core';
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}
  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: response => {
        console.log('Login response:', response); 
        this.authService.handleLoginResponse(response);
        this.errorMessage = '';
        this.router.navigate(['/']);
      },
      error: err => {
        console.error('Login error:', err); 
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
