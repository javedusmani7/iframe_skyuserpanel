import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RightSideCompComponent } from '../right-side-comp/right-side-comp.component';

@Component({
  selector: 'app-tomorrow',
  imports: [CommonModule, RouterLink, RightSideCompComponent],
  templateUrl: './tomorrow.component.html',
  styleUrl: './tomorrow.component.css'
})
export class TomorrowComponent {

}
