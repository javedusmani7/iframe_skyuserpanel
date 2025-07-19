import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LeftSideCompComponent } from '../left-side-comp/left-side-comp.component';
import { RightSideCompComponent } from '../right-side-comp/right-side-comp.component';
import { BetPlaceCompComponent } from '../bet-place-comp/bet-place-comp.component';

@Component({
  selector: 'app-main-page',
  imports: [CommonModule, LeftSideCompComponent, RightSideCompComponent, BetPlaceCompComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
