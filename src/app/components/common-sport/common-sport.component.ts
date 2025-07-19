import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LeftSideCompComponent } from "../left-side-comp/left-side-comp.component";
import { RightSideCompComponent } from "../right-side-comp/right-side-comp.component";
import { DesktopFooterComponent } from '../desktop-footer/desktop-footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-common-sport',
  imports: [CommonModule, LeftSideCompComponent, RightSideCompComponent,DesktopFooterComponent, RouterLink],
  templateUrl: './common-sport.component.html',
  styleUrl: './common-sport.component.css'
})
export class CommonSportComponent {

}
