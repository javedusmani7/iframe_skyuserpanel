import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LeftSideCompComponent } from '../left-side-comp/left-side-comp.component';
import { RightSideCompComponent } from '../right-side-comp/right-side-comp.component';

@Component({
  selector: 'app-multi-markets',
  imports: [CommonModule,LeftSideCompComponent,RightSideCompComponent],
  templateUrl: './multi-markets.component.html',
  styleUrl: './multi-markets.component.css'
})
export class MultiMarketsComponent {

}
