import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RightSideCompComponent } from '../right-side-comp/right-side-comp.component';

@Component({
  selector: 'app-inplay',
  imports: [CommonModule, RouterLink, RightSideCompComponent],
  templateUrl: './inplay.component.html',
  styleUrl: './inplay.component.css'
})
export class InplayComponent {

}
