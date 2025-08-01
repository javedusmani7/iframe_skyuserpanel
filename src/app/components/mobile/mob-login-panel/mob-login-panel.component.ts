import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobFooterComponent } from '../mob-footer/mob-footer.component';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Fingerprint2 from 'fingerprintjs2';

@Component({
  selector: 'app-mob-login-panel',
  standalone: true,
  imports: [CommonModule, MobFooterComponent, RouterLink, FormsModule],
  templateUrl: './mob-login-panel.component.html',
  styleUrls: ['./mob-login-panel.component.css']
})

export class MobLoginPanelComponent implements AfterViewInit {
  showpwrd = false;
  captchaUrl = '';
  captchaInput = '';
  fingerprintHash = '';
  resultMessage = '';
  resultClass = '';
  captchaLoaded = false;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    Fingerprint2.get((components) => {
      this.fingerprintHash = Fingerprint2.x64hash128(
        components.map(c => c.value).join(''),
        31
      );
      this.loadCaptcha();
    });
  }

  loadCaptcha(): void {
    const timestamp = Date.now();
    this.captchaUrl = '';
    this.captchaLoaded = false;
    this.captchaUrl = `https://node.fluc.eu/api/v1/users/captcha?fp=${this.fingerprintHash}&_t=${timestamp}`;
    this.resultMessage = '';
    this.resultClass = '';
  }

  validateCaptcha(): void {
    const body = {
      userInput: this.captchaInput,
      fingerprint: this.fingerprintHash
    };

    this.http.post<any>('https://node.fluc.eu/api/v1/users/validate-captcha', body, {
      withCredentials: true,
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).subscribe((response) => {
      if (response.success) {
        this.resultMessage = '✅ ' + response.message;
        this.resultClass = 'success';
      } else {
        this.resultMessage = '❌ ' + response.message;
        this.resultClass = 'error';
        this.loadCaptcha(); // refresh
      }
      this.captchaInput = '';
    });
    this.loadCaptcha();
  }

  showpwd(): void {
    this.showpwrd = !this.showpwrd;
  }
}
