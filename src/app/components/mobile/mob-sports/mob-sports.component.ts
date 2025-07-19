import { MarqueeCompComponent } from './../../marquee-comp/marquee-comp.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mob-sports',
  imports: [CommonModule, MarqueeCompComponent,RouterLink,RouterLinkActive],
  templateUrl: './mob-sports.component.html',
  styleUrls: ['./mob-sports.component.css']
})
export class MobSportsComponent {
  banners = [
    { banner_images: '../../../assets/images/main/kv-skyexchange-m.jpg' },
    { banner_images: '../../../assets/images/main/kv-skyexchange-2-m.jpg' },
    { banner_images: '../../../assets/images/main/kv-casino-int-m.png' },
    { banner_images: '../../../assets/images/main/kv-jili-teenpatti-m.jpg' },
    { banner_images: '../../../assets/images/main/kv-casino-tna-m.jpg' },
    { banner_images: '../../../assets/images/main/kv-casino-cardMatka-m.jpg' },
    { banner_images: '../../../assets/images/main/kv-casino-numberMatka-m.jpg' },
    { banner_images: '../../../assets/images/main/kv-sexy-roulette-m.jpg' },
    { banner_images: '../../../assets/images/main/kv-betgames-9livegames-m.png' },
  ];
  activetab = 'time';

  constructor(private route: Router) {

  }
  openResults() {
    // const token = localStorage.getItem('token');
    // if (token) {
    this.route.navigate(['/Mchecksportwiseresult']);
    // } else {
    //   this.route.navigate(['/mob-login']);
    // }
  }
  selectedtab(data: any) {
    this.activetab = data;
  }

}
