import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MarqueeCompComponent } from '../../marquee-comp/marquee-comp.component';

@Component({
  selector: 'app-mob-inplay-tomorrow',
    imports:[CommonModule,MarqueeCompComponent,RouterLink],
  templateUrl: './mob-inplay-tomorrow.component.html',
  styleUrls: ['./mob-inplay-tomorrow.component.css']
})

export class MobInplayTomorrowComponent {
  constructor(private route:Router){

  }
openResults(){
    // const token = localStorage.getItem('token');
    // if (token) {
      this.route.navigate(['/Mchecksportwiseresult']);
    // }else{
    //   this.route.navigate(['/mob-login']);
    // }
  }
}
