import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PopupBoxComponent } from '../popup-box/popup-box.component';
import { AuthserviceService } from '../../services/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive, PopupBoxComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent {
  loggedIn: boolean = true;
  showpwrd: boolean = false;
  refreshBtn = false
  accPopoup = false;
  oneClick: boolean = false;
  showHeader: boolean = true;
  popup: boolean = false;
  private api = inject(AuthserviceService)
  private toaster = inject(ToastrService)

  constructor(private router: Router) {

  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !(event.url.includes('/mob-login') || event.url.includes('/show-book'));
        // this.openTv = event.url.includes('/mob-match')
        // this.hideDeskHeader = !event.url.includes('/announcement')
      }
    });
    this.upDateBalance()
  }

  showpwd() {
    this.showpwrd = !this.showpwrd
  }
  upDateBalance() {
    this.refreshBtn = true;
    setTimeout(() => {
      this.refreshBtn = false;
    }, 500);

  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Hide the div when clicked outside
    const target = event.target as HTMLElement
    if (!(target).closest('.account_pop')) {
      this.accPopoup = false;
    }
  }
  toggleMenu() {
    this.accPopoup = true;
  }
  hideAccPopup() {
    this.accPopoup = false;
  }
  fadeLoginPopup(data: any) {
    this.popup = !this.popup
  }
  oneClickBet() {
    this.popup = !this.popup
  }
  closeloginpopup() {
    this.popup = false
  }

  logout(){
    this.api.logout().subscribe({
      next: (res: any) => {
        this.router.navigateByUrl("/mob-login");
        this.toaster.success('Logout successfully');
      }
    })
  }
}
