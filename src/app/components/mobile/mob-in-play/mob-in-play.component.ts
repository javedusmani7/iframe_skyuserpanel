import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MarqueeCompComponent } from '../../marquee-comp/marquee-comp.component';
import { Router, RouterLink } from '@angular/router';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

@Component({
  selector: 'app-mob-in-play',
  imports: [CommonModule, MarqueeCompComponent, RouterLink],
  templateUrl: './mob-in-play.component.html',
  styleUrls: ['./mob-in-play.component.css']
})
export class MobInPlayComponent implements OnInit{
  deviceId: string = '';

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.getDeviceId();
  }
  openResults() {
    // const token = localStorage.getItem('token');
    // if (token) {
    this.route.navigate(['/Mchecksportwiseresult']);
    // }else{
    //   this.route.navigate(['/mob-login']);
    // }
  }

  async getDeviceId(): Promise<void> {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    this.deviceId = result.visitorId;
    console.log('Device ID:', this.deviceId);
  }
}
