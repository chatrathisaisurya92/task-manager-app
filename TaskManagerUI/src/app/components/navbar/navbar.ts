import { Component, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  showDropdown = false;

  constructor(
    private router: Router,
    private elementRef: ElementRef
  ) {}

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  // ✅ Closes dropdown when clicking anywhere outside the navbar
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showDropdown = false;
    }
  }

  logout() {
    this.showDropdown = false;
    localStorage.clear();
    this.router.navigate(['/']);
  }

  getUsername(): string {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.username || 'User';
    } catch {
      return 'User';
    }
  }

  getInitials(): string {
    const name = this.getUsername();
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}