import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [CommonModule,RouterLinkActive,RouterLink],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  showNav: boolean = true;
  loggedIn: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.showNav = !(event.url.includes('/mob-login') || event.url.includes('/show-book'));
    //   }
    // });
  }
   getLinkStyles(isActive: boolean): { [key: string]: any } {
    if (isActive) {
      // Return styles when the router link is active
      return {
        'background-color': 'transparent',  // Example background color
        'background-image': 'linear-gradient(-180deg, #32617f 20%, #1f4258 91%)',
      };
    } else {
      return {
        'background-color': 'transparent'  // Default background color
      }
    }
  }
  getFiltercss(isActive: boolean): string {
    return isActive
      ? '#fff' : '#fff';
  }
   getActiceTxt(isActive: boolean): { [key: string]: any } {
    if (isActive) {
      // Return styles when the router link is active
      return {
        'color': '#fff'
      };
    } else {
      return {
        'color': '#fff'
      }
    }
  }
}
