import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MarqueeCompComponent } from '../../marquee-comp/marquee-comp.component';

@Component({
  selector: 'app-mob-my-profile',
  imports:[CommonModule,RouterLink,MarqueeCompComponent],
  templateUrl: './mob-my-profile.component.html',
  styleUrls: ['./mob-my-profile.component.css']
})
export class MobMyProfileComponent{
  loggedIn = false;
  userData : any;
  isLogin  = false;
  constructor(private router : Router){}

  logout(){
    this.router.navigate(['/home'])
    // localStorage.removeItem('token')
    // localStorage.removeItem('userData')
    // this.dataServe.getloggedData(this.loggedIn)
    // this.authServe.logout();
  }

}
