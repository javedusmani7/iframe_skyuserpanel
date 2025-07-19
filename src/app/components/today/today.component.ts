import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RightSideCompComponent } from '../right-side-comp/right-side-comp.component';

@Component({
  selector: 'app-today',
  imports: [CommonModule, RouterLink, RightSideCompComponent],
  templateUrl: './today.component.html',
  styleUrl: './today.component.css'
})
export class TodayComponent {

}
