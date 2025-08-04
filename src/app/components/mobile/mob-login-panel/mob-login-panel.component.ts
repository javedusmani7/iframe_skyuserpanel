import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobFooterComponent } from '../mob-footer/mob-footer.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthserviceService } from '../../../services/authservice.service';
import { DataHandlerService } from '../../../services/datahandler.service';
import { trimValidator } from '../../../services/trim.validator';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Fingerprint2 from 'fingerprintjs2';

@Component({
  selector: 'app-mob-login-panel',
  standalone: true,
  imports: [CommonModule, MobFooterComponent, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './mob-login-panel.component.html',
  styleUrls: ['./mob-login-panel.component.css']
})
export class MobLoginPanelComponent implements OnInit, AfterViewInit {
  showpwrd = false;
  captchaUrl: string = '';
  captchaInput = '';
  fingerprintHash = '';
  resultMessage = '';
  resultClass = '';
  captchaLoaded = false;
  loggedData: any;

  constructor(
    private dataServe: DataHandlerService,
    private authserve: AuthserviceService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.dataServe.sendLoggedData2.subscribe((res: any) => {
      this.resultMessage = res;
    });

    this.loggedData = new FormGroup({
      userId: new FormControl(null, [Validators.maxLength(30), trimValidator()]),
      pass: new FormControl(null, [Validators.maxLength(30), trimValidator()]),
      validCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{1,4}$/), Validators.max(4)])
    });
  }

  ngAfterViewInit(): void {
    this.getFingerprintHash();
  }

  login(): void {
    const body = {
      username: this.loggedData.value.userId,
      password: this.loggedData.value.pass,
      captcha: this.loggedData.value.validCode,
      fp: this.fingerprintHash
    };

    if (this.loggedData.value.validCode != null) {
      if (this.loggedData.value.userId != null && this.loggedData.value.pass != null) {
        this.dataServe.validateLogin(body);
      } else {
        this.resultMessage = 'Username and Password is Required';
        this.resultClass = 'error';
      }
    } else {
      this.resultMessage = '❌ Enter Validation Code';
      this.resultClass = 'error';
      this.loadCaptcha();
    }

    this.loggedData.reset();
  }

  showpwd(): void {
    this.showpwrd = !this.showpwrd;
  }

  numberOnly(event: any): any {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var regex2 = new RegExp(/^[0-9]{1,4}$/);
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key) || !regex2.test(key)) {
      event.preventDefault();
      return false;
    }
  }

  async getFingerprintHash(): Promise<void> {
    Fingerprint2.get((components) => {
      const hash = Fingerprint2.x64hash128(
        components.map(c => c.value).join(''),
        31
      );

      this.ngZone.run(() => {
        this.fingerprintHash = hash;
        console.log('Fingerprint Hash:', this.fingerprintHash);
        this.loadCaptcha(); // Ensure it runs after hash is ready
      });
    });
  }

  loadCaptcha(): void {
    if (!this.fingerprintHash) {
      console.warn('Fingerprint not ready. Retrying CAPTCHA...');
      setTimeout(() => this.loadCaptcha(), 100);
      return;
    }

    const timestamp = Date.now();
    this.captchaLoaded = false;
    this.resultMessage = '';
    this.resultClass = '';

    this.dataServe.getCaptcha(this.fingerprintHash, timestamp).subscribe((blob: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.captchaUrl = reader.result as string;
        this.captchaLoaded = true;
      };
      reader.readAsDataURL(blob);
    });
  }
}
