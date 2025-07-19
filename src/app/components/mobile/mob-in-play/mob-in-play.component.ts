import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MarqueeCompComponent } from '../../marquee-comp/marquee-comp.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-mob-in-play',
  imports: [CommonModule, MarqueeCompComponent, RouterLink],
  templateUrl: './mob-in-play.component.html',
  styleUrls: ['./mob-in-play.component.css']
})
export class MobInPlayComponent {
  constructor(private route: Router) {

  }
  openResults() {
    // const token = localStorage.getItem('token');
    // if (token) {
    this.route.navigate(['/Mchecksportwiseresult']);
    // }else{
    //   this.route.navigate(['/mob-login']);
    // }
  }
}
