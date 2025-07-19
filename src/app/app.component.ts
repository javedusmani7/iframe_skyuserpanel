import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/mobile/nav/nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,HeaderComponent,NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'skydesignB2B-19';
  showHeaderFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeaderFooter =!(
  event.url.includes('/mob-bets') ||
  event.url.includes('/mob-login')||
  event.url.includes('/regulations')
);
      }
    });

  }
}
