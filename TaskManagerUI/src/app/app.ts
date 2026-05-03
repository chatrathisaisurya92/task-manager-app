import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent],
  template: `
    <!-- Navbar only after login -->
    <app-navbar *ngIf="isLoggedIn()"></app-navbar>

    <!-- Page Content -->
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

}