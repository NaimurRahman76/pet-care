import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  isSignupClosed = true; 
  onSubmit(form: any) {
    if (form.valid) {
      const { fullName, email, gender, password, confirmPassword } = form.value;
      
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      // Implement signup logic, e.g., call backend API to register the user
      console.log('Form Data:', { fullName, email, gender, password });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
