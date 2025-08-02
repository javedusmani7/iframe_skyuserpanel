import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject, Subject, interval } from 'rxjs';
import { Router } from '@angular/router';
import { DataHandlerService } from './datahandler.service';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService implements OnDestroy {
  baseUrl = environment.baseUrl;
  secretKey = environment.secretKey;
  sendLoggedData: BehaviorSubject<any> = new BehaviorSubject('abc')
  sendLoggedData1 = new Subject<any>()
  sendLoggedData2 = new Subject<any>()
  sendLoggedData3 = new Subject<any>()
  sendPrivacy = new Subject<any>()

  private countListenter = new Subject<any>();
  usersData: any;
  loginFlag: any;
  eventData: any;
  interval$ = interval(5000);
  checkInterval: any
  intervalSubscription: any;
  loggedIn = false;
  domain: any;

  constructor(private http: HttpClient, private router: Router, private dataserve: DataHandlerService) {}

  ngOnInit(): void {
    this.domain = this.getdomain();
    // this.domain = 'luckywin.asia'
    // this.domain = 'bet36.buzz'
    // this.domain = 'lc247.life'
    this.baseUrl = `https://ag.${this.domain}/api-V2`
  }

  getdomain(){
    let dname = window.location.hostname;
    return dname;
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

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData')
    window.location.reload()
    this.loggedIn = false;
    this.sendLoggedData1.next(this.loggedIn)
    this.router.navigate(['/home']);
  }
  getData(data : any){
    this.sendPrivacy.next(data)
  }
}
