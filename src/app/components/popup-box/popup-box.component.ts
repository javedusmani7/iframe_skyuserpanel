import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup-box',
  imports: [],
  templateUrl: './popup-box.component.html',
  styleUrl: './popup-box.component.css'
})
export class PopupBoxComponent {
  @Output() showPopup = new EventEmitter()

  removePopup() {
    this.showPopup.emit(false)
  }
}
