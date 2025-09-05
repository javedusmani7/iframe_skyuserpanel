import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

import { PlacedBetComponent } from "../placed-bet/placed-bet.component";
import { MarqueeCompComponent } from "../../marquee-comp/marquee-comp.component";
import { DataHandlerService } from "../../../services/datahandler.service";

@Component({
  selector: 'app-mob-main-page',
  imports: [CommonModule, MarqueeCompComponent,PlacedBetComponent],
  templateUrl: './mob-main-page.component.html',
  styleUrls: ['./mob-main-page.component.css']
})

export class MobMainPageComponent {
  showFancy = true;
  toggleFancy = true;
  premiumpermission = true
  hideHeader1: boolean = false;
  hideHeader2: boolean = false;
  fancyinfo=false
  api = inject(DataHandlerService)

  router = inject(Router);

  constructor() {
    const nav = this.router.getCurrentNavigation();
    const data = nav?.extras?.state;

    if (!data) {
      this.api.redirectToPath('/mob-sport');
    }
    console.log("DATA", data);
    
  }

  hideFancyBet() {
    this.toggleFancy = true
    this.showFancy = true
    this.premiumpermission = true
  }
  showPreFancy() {
    this.toggleFancy = false
    this.showFancy = false
    this.premiumpermission = false
  }
  openRulesPopup() {
    this.hideHeader1 = !this.hideHeader1

  }
  openPRulesPopup() {
    this.hideHeader2 = !this.hideHeader2

  }
  closeBMinfo() {
    this.hideHeader1 = false;
    this.hideHeader2 = false;
  }
  openFancyInfo(){
    this.fancyinfo=!this.fancyinfo
  }
  book=false
  openBook(){
this.book=!this.book
  }
}
