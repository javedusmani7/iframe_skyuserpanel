import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MarqueeCompComponent } from '../../marquee-comp/marquee-comp.component';

@Component({
  selector: 'app-mob-multi-market',
  imports: [CommonModule, MarqueeCompComponent],
  templateUrl: './mob-multi-market.component.html',
  styleUrls: ['./mob-multi-market.component.css']
})
export class MobMultiMarketComponent {

}
