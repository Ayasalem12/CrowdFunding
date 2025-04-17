import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  first_name: string = '';
  last_name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';
  mobile_phone: string = '';
  error: string | null = null;
  success: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirm_password) {
      this.error = "Password Doesn't match";
      return;
    }

    const userData = {
      first_name: this.first_name,
      last_name: this.last_name,
      username: this.username,
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password,
      mobile_phone: this.mobile_phone,
      is_admin: false,
    };

    this.http.post('http://127.0.0.1:8000/api/register/', userData).subscribe({
      next: (response) => {
        this.success = 'Register successful, please verify your account';
        this.router.navigate(['/verify-account']);
      },
      error: (error) => {
        this.error =
          'Register failed ' + (error.error?.message || 'Unknown error');
      },
    });
  }
}
