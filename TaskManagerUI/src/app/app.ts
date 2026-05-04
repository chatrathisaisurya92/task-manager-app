import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  template: `
    <app-navbar *ngIf="showNavbar"></app-navbar>
    <div [style.padding-top]="showNavbar ? '60px' : '0px'">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {

  showNavbar = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {

        const url = event.urlAfterRedirects;

        // ❌ Hide navbar on login
        if (url === '/' || url === '/login') {
          this.showNavbar = false;
        } else {
          this.showNavbar = true;
        }
      });
  }
}