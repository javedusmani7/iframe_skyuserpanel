import { CommonModule } from '@angular/common';
import { Component, OnInit , OnDestroy} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ProfileLeftCompComponent } from '../profile-left-comp/profile-left-comp.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-bets',
  imports:[CommonModule,ProfileLeftCompComponent,RouterLink],
  templateUrl: './my-bets.component.html',
  styleUrls: ['./my-bets.component.css']
})

export class MyBetsComponent implements OnInit , OnDestroy{
  userBets : any;
  exchange : any;
  selected : any = "Odds";
  expand : any;
  expandcheck = false;
  loading: boolean = true;

  constructor(private meta: Meta){}

  ngOnInit(): void {

    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=0' });
  }

  ngOnDestroy(): void {
    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
  }



  details(){
    this.expandcheck=!this.expandcheck
  }
}
