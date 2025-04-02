import { Component } from '@angular/core';
import { Router,RouterLink,RouterLinkActive } from '@angular/router';
// import  
@Component({
  selector: 'app-header',
  imports:[RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userImage = 'https://github.com/mdo.png'; 

  constructor(private router: Router) {}

  signOut() {
    localStorage.removeItem('token'); // Clear JWT token
    this.router.navigate(['/login']); 
  }
}