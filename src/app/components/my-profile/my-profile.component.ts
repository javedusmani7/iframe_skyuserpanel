import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ProfileLeftCompComponent } from "../profile-left-comp/profile-left-comp.component";
import { Meta } from "@angular/platform-browser";


@Component({
  selector: 'app-my-profile',
  imports:[CommonModule,ProfileLeftCompComponent],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent{

  userData: any;
  changePass: any;
  myProf = false;
  passResponse: any;
  errMsg: string = ''
  showMsg = false;
  constructor( private meta: Meta) { }
  ngOnInit(): void {

    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=0' });
  }

  ngOnDestroy(): void {
    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
  }

  showchangePass() {
    document.getElementById('passPopUp')?.classList.add('d-block')
  }
  closePopup() {
    document.getElementById('passPopUp')?.classList.remove('d-block')

  }
}
