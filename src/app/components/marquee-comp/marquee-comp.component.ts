import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-marquee-comp',
  imports: [CommonModule],
  templateUrl: './marquee-comp.component.html',
  styleUrls: ['./marquee-comp.component.css']
})

export class MarqueeCompComponent {
  @HostListener('window:resize', ['$event'])
  announcemntPopup = false;
  clickonmarq() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      this.announcemntPopup = true
    } else {
      window.open('/announcement', '_blank');
    }
  }
  closePopup() {
    this.announcemntPopup = false;
  }
}
