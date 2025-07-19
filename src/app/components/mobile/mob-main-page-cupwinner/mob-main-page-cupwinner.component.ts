import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MarqueeCompComponent } from '../../marquee-comp/marquee-comp.component';
import { PlacedBetCupwinnerComponent } from '../placed-bet-cupwinner/placed-bet-cupwinner.component';

@Component({
  selector: 'app-mob-main-page-cupwinner',
  imports:[CommonModule,MarqueeCompComponent,PlacedBetCupwinnerComponent],
  templateUrl: './mob-main-page-cupwinner.component.html',
  styleUrls: ['./mob-main-page-cupwinner.component.css']
})

export class MobMainPageCupwinnerComponent {


}
