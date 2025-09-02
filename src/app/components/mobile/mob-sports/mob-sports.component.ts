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

  ngOnInit(): void {
      this.fetchMatches();
  }

  // fetchMatches(): void {
  //   const requestBody = {
  //     sportId: this.sportId,
  //     page: this.pageNumber,
  //     limit: this.pageSize,
  //     filters: {
  //       status: this.status
  //     }
  //   };

  //   this.api.getMatches(requestBody).subscribe({
  //     next: (res: any) => {
  //       this.matches = res?.data?.data.map((ele: any) => {
  //         const live = this.checkIfInPlay(ele.openDate);
  //         return {
  //           ...ele,
  //           isInPlay: live
  //         }
  //       });
  //       this.loading = false;
  //     }
  //   });
  // }

  fetchMatches(): void {
    const requestBody = {
      sportId: this.sportId,
      page: this.pageNumber,
      limit: this.pageSize,
      filters: {
        status: this.status
      }
    };

    this.api.getMatches(requestBody).subscribe({
      next: (res: any) => {
        const flatMatches = res?.data?.data.map((ele: any) => {
          return {
            ...ele,
            isInPlay: this.checkIfInPlay(ele.openDate)
          };
        });
        this.matches = flatMatches;

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
        console.log(this.groupedMatches);
        
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load matches';
        this.loading = false;
      }
    });
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
  selectedtab(data: any) {
    this.activetab = data;
  }
}
