import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import FingerprintJS from '@fingerprintjs/fingerprintjs';

import moment from 'moment';

import { MarqueeCompComponent } from '../../marquee-comp/marquee-comp.component';
import { DataHandlerService } from '../../../services/datahandler.service';

@Component({
  selector: 'app-mob-in-play',
  imports: [CommonModule, MarqueeCompComponent],
  templateUrl: './mob-in-play.component.html',
  styleUrls: ['./mob-in-play.component.css']
})
export class MobInPlayComponent implements OnInit {
  // Injecting required services
  private api = inject(DataHandlerService);
  private router = inject(Router);

  deviceId: string = '';
  inPlayMatches: { [key: string]: any[] } = {};
  todayMatches: { [key: string]: any[] } = {};
  tomorrowMatches: { [key: string]: any[] } = {};
  selectedTab: 'inplay' | 'today' | 'tomorrow' = 'inplay';

  sportMap: { [key: string]: string } = {
    'Cricket': "4",
    'Soccer': "1",
    'Tennis': "2"
  };

  constructor(private route: Router) { }


  ngOnInit(): void {
    this.loadAllSportsMatches();
  } loadAllSportsMatches(): void {
    for (const [sportKey, sportId] of Object.entries(this.sportMap)) {
      const requestBody = {
        sportId,
        page: 1,
        limit: 100,
        filters: {}
      };

      this.api.getMatches(requestBody).subscribe({
        next: (res: any) => {
          const allMatches = res?.data?.data.map((ele: any) => {
            return {
              ...ele,
              isInPlay: this.checkIfInPlay(ele.openDate),
              openDate: new Date(ele.openDate)
            };
          }) || [];

          // Filter in-play
          this.inPlayMatches[sportKey] = allMatches.filter((match: any) => match.isInPlay);

          // Filter today
          this.todayMatches[sportKey] = allMatches.filter((match: any)  => this.isToday(match.openDate));

          // Filter tomorrow
          this.tomorrowMatches[sportKey] = allMatches.filter((match: any)  => this.isTomorrow(match.openDate));
        },
        error: (err) => {
          console.error(`Failed to load matches for ${sportKey}`, err);
        }
      });
    }
  }

  
    /**
     * Check if match is currently in play (live) using its start time
    */
    checkIfInPlay(date: any) {
      const now = moment();
      const gameStart =  moment(date);
      const result = now.isSameOrAfter(gameStart);
      // console.log(result,":::GAME START", gameStart); 
      return result
    }

  // checkIfInPlay(date: string | Date): boolean {
  //   const openDate = new Date(date);
  //   const now = new Date();
  //   return openDate <= now;
  // }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  isTomorrow(date: Date): boolean {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear()
    );
  }

  getMatchesForTab(tab: 'inplay' | 'today' | 'tomorrow'): { sport: string, matches: any[] }[] {
    const matchSet = tab === 'inplay'
      ? this.inPlayMatches
      : tab === 'today'
        ? this.todayMatches
        : this.tomorrowMatches;

    return Object.entries(matchSet)
      .filter(([_, matches]) => matches.length > 0)
      .map(([sport, matches]) => ({ sport, matches }));
  }

  selectTab(tab: 'inplay' | 'today' | 'tomorrow') {
    this.selectedTab = tab;
  }







  openResults() {
    this.router.navigateByUrl("/Mchecksportwiseresult");
    // this.route.navigate(['/Mchecksportwiseresult']);
  }

  async getDeviceId(): Promise<void> {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    this.deviceId = result.visitorId;
    console.log('Device ID:', this.deviceId);
  }
}
