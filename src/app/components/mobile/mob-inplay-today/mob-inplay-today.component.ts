import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MarqueeCompComponent } from '../../marquee-comp/marquee-comp.component';

@Component({
  selector: 'app-mob-inplay-today',
    imports:[CommonModule,MarqueeCompComponent,RouterLink],
  templateUrl: './mob-inplay-today.component.html',
  styleUrls: ['./mob-inplay-today.component.css']
})
export class MobInplayTodayComponent  {

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
