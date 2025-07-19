import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-regulations',
  imports: [CommonModule],
  templateUrl: './regulations.component.html',
  styleUrl: './regulations.component.css'
})
export class RegulationsComponent {
  domain = "localhost";
    privacyData = localStorage.getItem('regulations')
  
}
