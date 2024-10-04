import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, FormsModule,ReactiveFormsModule ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'pet-care';
  isLoggedIn = false;
  username: string | null = '';
  postForm: FormGroup;
  selectedFile: File | null = null;
  private postApiUrl = 'https://localhost:7088/api/post'; 
  constructor(private authService: AuthService, private cdr: ChangeDetectorRef,private fb: FormBuilder, private http: HttpClient) 
  {
    this.postForm = this.fb.group({
      body: ['', Validators.required],
      isAnonymous: [false],
      alias: [''],
    });
  }
  toggleAnonymous() {
    if (!this.postForm.get('isAnonymous')!.value) {
      this.postForm.get('alias')!.setValue(''); 
    }
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('body', this.postForm.get('body')!.value);
    formData.append('isAnonymous', this.postForm.get('isAnonymous')!.value ? 'true' : 'false');
    formData.append('alias', this.postForm.get('alias')!.value || 'Anonymous');

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.post(`${this.postApiUrl}/CreatePost`, formData,{withCredentials:true}).subscribe(response => {
      console.log('Post submitted successfully!', response);
      this.postForm.reset();
      this.selectedFile = null;
    }, error => {
      console.error('Error submitting post:', error);
    });
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }
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
