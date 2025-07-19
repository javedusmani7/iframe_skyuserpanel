import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-desktop-footer',
  imports: [CommonModule],
  templateUrl: './desktop-footer.component.html',
  styleUrl: './desktop-footer.component.css'
})
export class DesktopFooterComponent {

  openPolicypopup(data: any) {
    localStorage.setItem("regulations", data)
    let myWindow = window.open(`./regulations`, "riskpage", "width=1056,height=860")

  }
}
