import { inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import * as CryptoJS from 'crypto-js';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class DataHandlerService implements OnInit {
  baseUrl = environment.baseUrl;
  sendLoggedData: BehaviorSubject<any> = new BehaviorSubject('abc')
  sendLoggedData1 = new Subject<any>()
  sendLoggedData2 = new Subject<any>()
  sendLoggedData3 = new Subject<any>()
  logoutTimer = new Subject<any>()
  openLTV = new Subject<any>()
  oneClickB = new Subject<any>()
  betSuccessMsg = new Subject<any>()
  private countListenter = new Subject<any>();
  usersData: any;
  loginFlag: any;
  eventData: any;
  sessionTimeout: any;
  domain: any;
  toaster = inject(ToastrService)

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // this.domain = this.getdomain();
    // this.domain = 'luckywin.asia'
    // this.baseUrl = `https://ag.${this.domain}/api-V2`
  }

  getdomain() {
    // let dname = window.location.hostname;
    // return dname;
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    this.router.navigate(['/home'])
  }

  token: any = localStorage.getItem("token")

  getCaptcha(fingerPrintHash: string, timestamp: number): Observable<Blob> {
    const url = `https://node.fluc.eu/api/v1/users/captcha?fp=${fingerPrintHash}&_t=${timestamp}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  getGameCount() {
    return this.http.post(`${this.baseUrl}/getGamesCount`, {})
  }

  getGameListener() {
    return this.countListenter.asObservable();
  }

  getGameList(id: any) {
    return this.http.post(`${this.baseUrl}/getGamesList`, {
      sportId: id,
    });
  }

  getTodayGames() {
    return this.http.post(`${this.baseUrl}/getTodayGames`, {})
  }

  getTomorrowGames() {
    return this.http.post(`${this.baseUrl}/getTomorrowGames`, {})
  }

  getInPlayGames() {
    return this.http.post(`${this.baseUrl}/getInPlayGames`, {})
  }

  validateLogin(obj: any) {
    return this.http.post(`${this.baseUrl}/users/user-login`, obj).subscribe({
      next: (res: any) => {
        this.router.navigate(['/home']);
        this.toaster.success(res.message || 'User Logged in successfully');
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
  init(data: any) {
    this.sessionTimeout = data;
    const loginTimeStr = localStorage.getItem('loginTime');
    if (loginTimeStr) {
      const loginTime = parseInt(loginTimeStr, 10);
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - loginTime;

      if (elapsedTime >= this.sessionTimeout) {
        // Logout if session expired
        this.logout();
        window.location.reload()
      } else {
        // Start timer to check session expiration
        setTimeout(() => this.checkSession(), this.sessionTimeout - elapsedTime);
      }
    }
  }

  private checkSession() {
    const loginTimeStr = localStorage.getItem('loginTime');
    if (loginTimeStr) {
      const loginTime = parseInt(loginTimeStr, 10);
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - loginTime;

      if (elapsedTime >= this.sessionTimeout) {
        // Logout if session expired
        this.logout();
        window.location.reload()

      } else {
        // Restart timer
        setTimeout(() => this.checkSession(), this.sessionTimeout - elapsedTime);
      }
    }
  }

  isLoggedIn() {
    return this.http.post(`${this.baseUrl}/isLoginValid`, {})
  }

  getBalInfo() {
    return this.http.post(`${this.baseUrl}/getUserBalanceExpo`, {});
  }
  getAccountStmt(pNo: any) {
    return this.http.post(`${this.baseUrl}/getAccountStatements`, {
      "pageNo": pNo
    })
  }

  getActivityLog(pNo: any) {
    return this.http.post(`${this.baseUrl}/getAccountLogs`, {
      "pageNo": pNo
    })
  }

  getEventDataOnLoad(eventid: any) {
    return this.http.post(`${this.baseUrl}/getEventData`, {
      eventid: eventid,
    });
  }

  getEventDataOnLoadnew(eventid: any) {
    return this.http.post(`${this.baseUrl}/getEventDataOnLoad`, {
      eventid: eventid,
    });
  }

  getEventDataOnLoad2(eventid: any) {
    return this.http.post(`${this.baseUrl}/getPreLoadData?eventId=${eventid}`, {
    });
  }

  addToMultmarketList(eventId: any) {
    return this.http.post(`${this.baseUrl}/setMatchAsMultiMarket`, {
      eventid: eventId,
    });
  }

  getUserWiseMultiMarket() {
    return this.http.post(`${this.baseUrl}/getUserWiseMultiMarket`, {});
  }

  getUserBets() {
    return this.http.post(`${this.baseUrl}/getUserBets`, {});
  }

  changeYourPassword(obj: any) {
    return this.http.post(`${this.baseUrl}/changeLoginOwnPassword`, obj)
  }

  getBetHistory(obj: any) {
    return this.http.post(`${this.baseUrl}/getUsersBetHistory`, JSON.stringify(obj))
  }

  getListForResult(obj: any) {
    return this.http.post(`${this.baseUrl}/getListForResult?startDate=${obj.startDate}&endDate=${obj.endDate}&sportId=${obj.sportId}`, {})
  }

  getUserOwnProfitLoss(obj: any) {
    return this.http.post(`${this.baseUrl}/getUserOwnProfitLoss`, obj)
  }

  getUserBetsBySourceId(obj: any) {
    return this.http.post(`${this.baseUrl}/getUserBetsBySourceId`, obj)
  }

  getWebsiteData() {
    return this.http.post(`${this.baseUrl}/getWebsiteData`, {}, { observe: 'response' });
  }

  placeMatchOddsBet(data: any, stake: any) {
    return this.http.post(`${this.baseUrl}/placeMatchOddsBet`, {
      isBack: data.isBack,
      odds: data.odds,
      selectionId: Number(data.selectionId),
      selectionName: data.selectionName,
      stake: Number(stake),
      matchName: data.matchName,
      eventId: data.eventId,
      sourceId: data.sourceId,
      sourceBetType: data.sourceBetType,
      sportId: Number(data.sportId)
    });
  }

  setTossMatchBet(data: any, stake: any) {
    return this.http.post(`${this.baseUrl}/setTossMatchBet`, {
      isBack: data.isBack,
      odds: data.odds,
      selectionId: Number(data.selectionId),
      selectionName: data.selectionName,
      stake: Number(stake),
      matchName: data.matchName,
      eventId: data.eventId,
      sourceId: data.sourceId,
      sourceBetType: data.sourceBetType,
      sportId: Number(data.sportId),
      ipAddress: '182.69.177.136'
    });
  }

  placeBookMakerBet(data: any, stake: any) {
    return this.http.post(`${this.baseUrl}/placeBookMakerBet`, {
      isBack: data.isBack,
      odds: data.odds,
      selectionId: Number(data.selectionId),
      selectionName: data.selectionName,
      stake: Number(stake),
      matchName: data.matchName,
      eventId: data.eventId,
      sourceId: data.sourceId,
      sourceBetType: data.sourceBetType,
      sportId: Number(data.sportId)
    });
  }

  placeFancyMatchBet(data: any, stake: any) {
    return this.http.post(`${this.baseUrl}/placeFancyMatchBet`, {
      isBack: data.isBack,
      odds: Number(data.odds),
      priceValue: Number(data.selectionName),
      stake: Number(stake),
      matchName: data.matchName,
      eventId: data.eventId,
      sourceId: data.sourceId,
      sourceBetType: data.sourceBetType,
      sportId: Number(data.sportId),
      provider: data.fancyprovider.toLowerCase()
    });
  }

  setFancy1MatchBet(data: any, stake: any) {
    return this.http.post(`${this.baseUrl}/setFancy1MatchBet`, {
      isBack: data.isBack,
      odds: Number(data.odds),
      priceValue: Number(data.selectionName),
      stake: Number(stake),
      matchName: data.matchName,
      eventId: data.eventId,
      sourceId: data.sourceId,
      sourceBetType: data.sourceBetType,
      sportId: Number(data.sportId),
      provider: data.fancyprovider.toLowerCase()
    });
  }

  setPremiumMatchBet(data: any, stake: any) {
    return this.http.post(`${this.baseUrl}/setPremiumMatchBet`, {
      isBack: data.isBack,
      odds: Number(data.odds),
      selectionId: Number(data.selectionId),
      selectionName: data.selectionName,
      stake: Number(stake),
      matchName: data.matchName,
      eventId: data.eventId,
      sourceId: data.sourceId,
      sourceBetType: data.sourceBetType,
      sportId: Number(data.sportId),
      ipAddress: '182.69.177.136'
    });
  }

  setOtherMarketBet(data: any, stake: any) {
    return this.http.post(`${this.baseUrl}/setOtherMarketBet`, {
      isBack: data.isBack,
      odds: data.odds,
      selectionId: Number(data.selectionId),
      selectionName: data.selectionName,
      stake: Number(stake),
      matchName: data.matchName,
      eventId: data.eventId,
      sourceId: data.sourceId,
      sourceBetType: data.sourceBetType,
      sportId: Number(data.sportId),
      ipAddress: '182.69.177.136'
    });
  }

  setWinnerBet(data: any, stake: any) {
    return this.http.post(`${this.baseUrl}/setWinnerBet`, {
      isBack: data.isBack,
      odds: data.odds,
      selectionId: Number(data.selectionId),
      selectionName: data.selectionName,
      stake: Number(stake),
      matchName: data.matchName,
      eventId: data.eventId,
      sourceId: data.sourceId,
      sourceBetType: data.sourceBetType,
      sportId: Number(data.sportId)
    });
  }

  getUserMatchBookData(eventid: any, type: any) {
    return this.http.post(`${this.baseUrl}/getUserMatchBookData`, {
      eventid: eventid,
      type: type
    })
  }

  getUserFancyBookData(eventid: any) {
    return this.http.post(`${this.baseUrl}/getUserFancyBookData`, {
      eventid: eventid
    })
  }

  getListBookData(sourceId: any) {
    return this.http.post(`${this.baseUrl}/getListBookData`, {
      fancyid: sourceId
    })
  }

  getPremiumFancyBook(eventid: any) {
    return this.http.post(`${this.baseUrl}/getPremiumFancyBook?eventid=${eventid}`, {
    })
  }

  editStake(editStkObj: any) {
    return this.http.post(`${this.baseUrl}/editStakes`, editStkObj)
  }

  getActiveLiabUserWise() {
    return this.http.post(`${this.baseUrl}/getActiveLiabUserWise`, {})
  }

  getActiveBetsUserWise(sourceId: any) {
    return this.http.post(`${this.baseUrl}/getActiveBetsUserWise?sourceId=${sourceId}`, {})
  }

  LaunchAWCLobby() {
    return this.http.post(`${this.baseUrl}/AELOBBY`, {})
  }

  LaunchAWCGames(platform: any, gameType: any, gameCode: any) {
    return this.http.post(`${this.baseUrl}/LaunchAWCGames`, {
      platform: platform,
      gameType: gameType,
      gameCode: gameCode
    })
  }

  LaunchIntGames(gameId: any, gameCode: any) {
    return this.http.post(`${this.baseUrl}/LaunchIntGames`, {
      gameId: gameId,
      gameCode: gameCode
    })
  }

  LaunchCasinoGames(data: any) {
    return this.http.post(`${this.baseUrl}${data}`, {})
  }

  getMessageData() {
    return this.http.post(`${this.baseUrl}/getMessageData`, {})
  }

  changeIsOneClickBetStatus() {
    return this.http.post(`${this.baseUrl}/changeIsOneClickBetStatus`, {})
  }

  getUserOneClickBet() {
    return this.http.post(`${this.baseUrl}/getUserOneClickBet`, {})
  }

  isActiveOneClickBet() {
    return this.http.post(`${this.baseUrl}/isActiveOneClickBet`, {})
  }

  saveOneClickBetData(data: any) {
    return this.http.post(`${this.baseUrl}/saveOneClickBetData`, data)
  }

  getloggedData(data: any) {
    this.usersData = data
    this.sendLoggedData.next(this.usersData);
  }
  getEventData(data: any) {
    this.eventData = data
    this.sendLoggedData.next(this.eventData);
  }
  getloginFlag(data: any) {
    this.loginFlag = data;
    this.sendLoggedData1.next(this.loginFlag)
  }
  openLiveTv(data: any) {
    this.openLTV.next(data)
  }
  oneClickBet(data: any) {
    this.oneClickB.next(data)
  }
  betSuccess(data: any, alldata: any, stake: any, msg: any) {
    let dataArr = [];
    dataArr.push(data, alldata, stake, msg)
    this.betSuccessMsg.next(dataArr)
  }
  getOrganizedDataBySeriesname(gameList: any[]): { seriesname: string, matches: any[] }[] {
    const organizedData: { seriesname: string, matches: any[] }[] = [];
    const seriesMap = new Map<string, any[]>();

    gameList.forEach(item => {
      if (!seriesMap.has(item.seriesname)) {
        seriesMap.set(item.seriesname, []);
      }
      seriesMap.get(item.seriesname)?.push(item);
    });

    seriesMap.forEach((matches, seriesname) => {
      organizedData.push({ seriesname, matches });
    });

    return organizedData;
  }
  updateFavicon(faviconUrl: any) {
    // const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    // const faviconElement: HTMLLinkElement | null = document.querySelector('link[rel="icon"]');
    // if (favicon) {
    //   favicon.href = faviconUrl;
    // }
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = faviconUrl;
    document.getElementsByTagName('head')[0].appendChild(link);

  }
  decodejwt(token: string): any {
    // try {
    //   return this.jwtHelper.decodeToken(token);
    // } catch (error) {
    //   return null;
    // }
  }

  getMatches(data: any = {}): Observable<any> {
    return this.http.post(`${this.baseUrl}/usr/match/get`, data);
  }

  redirectToPath(path: string, data: any = {}) {
    this.router.navigateByUrl(path, { state: data });
  }

  // getCompetitions(data: any = {}): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/usr/competiiton/get`, data);
  // }
}


function lowercase(sourceBetType: any) {
  throw new Error('Function not implemented.');
}



