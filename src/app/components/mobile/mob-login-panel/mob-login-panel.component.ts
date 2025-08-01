import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobFooterComponent } from '../mob-footer/mob-footer.component';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Fingerprint2 from 'fingerprintjs2';

@Component({
  selector: 'app-mob-login-panel',
  standalone: true,
  imports: [CommonModule, MobFooterComponent, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './mob-login-panel.component.html',
  styleUrls: ['./mob-login-panel.component.css']
})

export class MobLoginPanelComponent implements OnInit {
  showpwrd = false;
  captchaUrl = '';
  captchaInput = '';
  fingerprintHash = '';
  resultMessage = '';
  resultClass = '';
  captchaLoaded = false;
  loggedData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    Fingerprint2.get((components) => {
      this.fingerprintHash = Fingerprint2.x64hash128(
        components.map(c => c.value).join(''),
        31
      );
      this.loadCaptcha();
    });

    this.loggedData = new FormGroup({
      userId: new FormControl(null, [Validators.maxLength(30)]),
      pass: new FormControl(null, [Validators.max(30)]),
      validCode: new FormControl(null, [Validators.required,Validators.pattern(/^[0-9]{1,4}$/), Validators.max(4)])
    })
  }

  loadCaptcha(): void {
    const timestamp = Date.now();
    this.captchaUrl = '';
    this.captchaLoaded = false;
    this.captchaUrl = `https://node.fluc.eu/api/v1/users/captcha?fp=${this.fingerprintHash}&_t=${timestamp}`;
    this.resultMessage = '';
    this.resultClass = '';
  }

  login(): void {
    // const body = {
    //   userInput: this.captchaInput,
    //   fingerprint: this.fingerprintHash
    // };

    // this.http.post<any>('https://node.fluc.eu/api/v1/users/validate-captcha', body, {
    //   withCredentials: true,
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // }).subscribe((response) => {
    //   if (response.success) {
    //     this.resultMessage = '✅ ' + response.message;
    //     this.resultClass = 'success';
    //   } else {
    //     this.resultMessage = '❌ ' + response.message;
    //     this.resultClass = 'error';
    //     this.loadCaptcha(); // refresh
    //   }
    //   this.captchaInput = '';
    // });

    if(this.loggedData.value.validCode != null){
      // if((this.loggedData.value.userId != null) && (this.loggedData.value.pass != null)){
      //   this.dataServe.validateLogin(this.loggedData.value);
        // this.router.navigate(['/home'])
      // }else{
      //   this.errMsg= 'Username and Password is Required'
      // }
    }else{
      this.resultMessage = '❌ Enter Validation Code'
      this.resultClass = 'error';
      this.loadCaptcha(); // refresh
    }
    this.loggedData.reset();
  }

  showpwd(): void {
    this.showpwrd = !this.showpwrd;
  }

  numberOnly(event: any):any {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var regex2 = new RegExp(/^[0-9]{1,4}$/);
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
       event.preventDefault();
       return false;
    }
    if(!regex2.test(key)){
      event.preventDefault();
      return false;
    }
  }
}
