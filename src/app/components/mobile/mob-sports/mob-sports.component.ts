import { MarqueeCompComponent } from './../../marquee-comp/marquee-comp.component';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DataHandlerService } from '../../../services/datahandler.service';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';

@Component({
  selector: 'app-mob-sports',
  imports: [CommonModule, MarqueeCompComponent,RouterLink,RouterLinkActive],
  templateUrl: './mob-sports.component.html',
  styleUrls: ['./mob-sports.component.css']
})
export class MobSportsComponent {
  private api = inject(DataHandlerService);
  private toastr = inject(ToastrService);
  private route = inject(ActivatedRoute);
  constructor(private router: Router) { }

  matches: any[] = [];
  groupedMatches: any[] = [];   // for competition grouping
  viewMode: 'match' | 'competition' = 'competition'; // toggle view
  loading: boolean = true;
  error: string = '';
  openDate: string = '';
  isInPlay: boolean = false;

  // pagination
  pageNumber: number = 1;
  pageSize: number = 200;
  totalRecords: number = 0;
  status: number = 1;
  sportId: any = "4";
  banners = [
    { banner_images: '../../../assets/images/main/kv-skyexchange-m.jpg' },
    { banner_images: '../../../assets/images/main/kv-skyexchange-2-m.jpg' },
    { banner_images: '../../../assets/images/main/kv-casino-int-m.png' },
    { banner_images: '../../../assets/images/main/kv-jili-teenpatti-m.jpg' },
    { banner_images: '../../../assets/images/main/kv-casino-tna-m.jpg' },
    { banner_images: '../../../assets/images/main/kv-casino-cardMatka-m.jpg' },
    { banner_images: '../../../assets/images/main/kv-casino-numberMatka-m.jpg' },
    { banner_images: '../../../assets/images/main/kv-sexy-roulette-m.jpg' },
    { banner_images: '../../../assets/images/main/kv-betgames-9livegames-m.png' },
  ];
  activetab = 'time';
  loadedTabs: Set<string> = new Set();
  selectedTab: string = 'Cricket'; // Default to Cricket

  // This will hold the match counts per tab
  matchCounts: { [key: string]: number } = {
    Cricket: 0,
    Soccer: 0,
    Tennis: 0,
  };

  ngOnInit(): void {
    this.selectTab(this.selectedTab); // Optionally load default tab data
  }

  
  selectedtab(data: any) {
    this.activetab = data;
  }
  
  selectTab(tab: string) {
    this.selectedTab = tab;

    // prevent reloading if the data is already available
    if (this.loadedTabs.has(tab)) {
      return; // Don't reload
    }

    switch (tab) {
      case 'Cricket':
        this.loadCricketData();
        break;
      case 'Soccer':
        this.loadSoccerData();
        break;
      case 'Tennis':
        this.loadTennisData();
        break;
    }
  }
  
  checkIfInPlay(date: any) {
    const now = moment();
    const gameStart =  moment(date);
    // console.log(date,":::GAME START", gameStart);
    const result = now.isSameOrAfter(gameStart);    
    return result
  }

  openResults() {
    this.router.navigateByUrl("/Mchecksportwiseresult");
    // this.route.navigate(['/Mchecksportwiseresult']);
  }

  loadCricketData() {
    console.log("inside loadCricketData");
    const sportKey="Cricket";
    const sportId="4";
    this.loadMatchData(sportKey, sportId);
  }

  loadSoccerData() {
    console.log("inside loadSoccerData");
    const sportKey="Soccer";
    const sportId="1";
    this.loadMatchData(sportKey, sportId);
  }

  loadTennisData() {
    const sportKey="Tennis";
    const sportId="2";
    this.loadMatchData(sportKey, sportId);
  }

  loadResultData() {
    console.log("inside loadResultData");
  }

  loadESoccerData() {
    console.log("inside loadESoccerData");
  }

  loadMatchData(sportKey: string, sportId: string) {
    console.log(`Loading data for: ${sportId}`);

    const requestBody = {
      sportId: sportId,
      page: this.pageNumber,
      limit: this.pageSize,
      filters: {
        status: this.status
      }
    };

    this.loading = true;

    this.api.getMatches(requestBody).subscribe({
      next: (res: any) => {
        const flatMatches = res?.data?.data.map((ele: any) => {
          return {
            ...ele,
            isInPlay: this.checkIfInPlay(ele.openDate)
          };
        });

        this.matches = flatMatches;

        // Set match count for this sport
        this.matchCounts[sportKey] = flatMatches.length;

        // Group by competitionName
        const grouped: any = {};
        flatMatches.forEach((match: any) => {
          const compName = match.competitionName || 'Other';
          if (!grouped[compName]) {
            grouped[compName] = {
              competitionName: compName,
              matches: []
            };
          }
          grouped[compName].matches.push(match);
        });

        this.groupedMatches = Object.values(grouped);
        this.loading = false;
      },
      error: (err) => {
        this.error = `Failed to load matches for ${sportKey}`;
        this.loading = false;
      }
    });
  }

}
