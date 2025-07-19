import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MobFooterComponent } from "../mob-footer/mob-footer.component";
import { RouterLink } from "@angular/router";


@Component({
  imports:[CommonModule,MobFooterComponent,RouterLink],
  selector: 'app-mob-login-panel',
  templateUrl: './mob-login-panel.component.html',
  styleUrls: ['./mob-login-panel.component.css']
})
export class MobLoginPanelComponent{
  showpwrd = false;
  showpwd(){
    this.showpwrd = !this.showpwrd
  }
}
