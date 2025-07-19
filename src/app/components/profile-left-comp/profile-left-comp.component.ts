import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-left-comp',
  imports:[CommonModule,RouterLink],
  templateUrl: './profile-left-comp.component.html',
  styleUrls: ['./profile-left-comp.component.css']
})
export class ProfileLeftCompComponent {

}
