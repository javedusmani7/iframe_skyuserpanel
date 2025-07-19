import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DesktopFooterComponent } from '../desktop-footer/desktop-footer.component';
import { MarqueeCompComponent } from '../marquee-comp/marquee-comp.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule,DesktopFooterComponent,MarqueeCompComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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
}
