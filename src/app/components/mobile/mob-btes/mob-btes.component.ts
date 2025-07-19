import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mob-bets',
  imports:[CommonModule,RouterLink],
  templateUrl: './mob-btes.component.html',
  styleUrls: ['./mob-btes.component.css']
})
export class MobBtesComponent {
  betList = true;
  betListInfo = false;



   openListInfo(){
    this.betList = false;
    this.betListInfo = true;

  }
   goBack(){
    this.betList = true;
    this.betListInfo = false;
  }
}
