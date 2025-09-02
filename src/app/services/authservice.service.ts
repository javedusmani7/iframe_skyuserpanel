import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject, Observable, Subject, interval } from 'rxjs';
import { Router } from '@angular/router';
import { DataHandlerService } from './datahandler.service';
import FingerprintJS from '@fingerprintjs/fingerprintjs';



@Injectable({
  providedIn: 'root'
})
export class AuthserviceService implements OnDestroy {
  baseUrl = environment.baseUrl;
  sendLoggedData: BehaviorSubject<any> = new BehaviorSubject('abc')
  sendLoggedData1 = new Subject<any>()
  sendLoggedData2 = new Subject<any>()
  sendLoggedData3 = new Subject<any>()
  sendPrivacy = new Subject<any>()
  usersData: any;
  loginFlag: any;
  eventData: any;
  interval$ = interval(5000);
  checkInterval: any
  intervalSubscription: any;
  loggedIn = false;
  domain: any;
  private fingerprint!: string; 
  private deviceId!: string;

  constructor(private http: HttpClient, private router: Router, private dataserve: DataHandlerService) {}

  ngOnInit(): void {
    this.domain = this.getdomain();
    // this.domain = 'luckywin.asia'
    // this.domain = 'bet36.buzz'
    // this.domain = 'lc247.life'
    // this.baseUrl = `https://ag.${this.domain}/api-V2`
  }

  getdomain(){
    let dname = window.location.hostname;
    return dname;
  }

  private generateDeviceId(fingerprintId: string): string {
    return `DEV-${btoa(fingerprintId).replace(/=/g, '').substring(0, 12)}`;
  }
  
  async getFingerprint(): Promise<any> {
    let result: any;
    if (!this.fingerprint) {
      const fp = await FingerprintJS.load();
      result = await fp.get();
      this.fingerprint = result.visitorId;
      this.deviceId = this.generateDeviceId(result.visitorId);
    }
    return {
      fingerprint: this.fingerprint,
      deviceId: this.deviceId
    };
  }

  validateLogin(obj: any) {
    return this.http.post(`${this.baseUrl}/validateLogin`, obj).subscribe((res: any) => {
      if (res.type !== 'error') {
        this.router.navigate(['/myAccount/home'])
        localStorage.setItem('token', res.password)
        localStorage.setItem('placebetcheck', 'false')
        localStorage.setItem('loginTime', new Date().getTime().toString());
        this.sendLoggedData.next(res)
        localStorage.setItem('userData', JSON.stringify(res))
        let dataa = this.dataserve.decodejwt(res?.password)
        const date = new Date(dataa.exp * 1000);
        let convertedDate = this.formatDate(date);
        let expTkn = new Date(convertedDate)
        let checkExpToken = expTkn.getTime()
        this.dataserve.init(checkExpToken)
        window.location.reload()
      } else {
        this.sendLoggedData2.next(res.message)
      }
    })
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  ngOnDestroy() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  isLoggedIn() {
    this.dataserve.isLoggedIn().subscribe((re: any) => {
      if(re?.type === 'error') {
        this.logout()
        this.sendLoggedData1.next(false)
        window.location.reload()
      }
    });
  }
  getData(data : any){
    this.sendPrivacy.next(data)
  }

  logout(data: any = {}): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/logout`, data);
  }
}
