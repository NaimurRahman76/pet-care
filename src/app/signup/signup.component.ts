import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  showPassword = false;
  showConfirmPassword = false;
  isSignupClosed = false; 
  successMessage: string | null = null;
  constructor(private authService: AuthService) {}

  onSubmit(form: any) {
    if (form.valid) {
      const { userName, email, gender, password, confirmPassword } = form.value;
      
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      this.authService.signup(userName, email, gender, password).subscribe({
        next: response => {
          console.log('Signup successful:', response);
          this.successMessage = 'Signup successful! You can now log in.';
        },
        error: err => {
          console.error('Signup error:', err);
          
          let errorMessage: string;
      
          if (err.error && err.error.message) {
              errorMessage = err.error.message;
          } else {
              errorMessage = 'Signup failed. Please try again.';
          }
      
          alert(errorMessage);
      }
      });
      
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
