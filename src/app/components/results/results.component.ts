import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { MarqueeCompComponent } from '../marquee-comp/marquee-comp.component';
import { RightSideCompComponent } from '../right-side-comp/right-side-comp.component';

@Component({
  selector: 'app-results',
  imports:[CommonModule,MarqueeCompComponent,RightSideCompComponent],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit, OnDestroy {
  public searchQuery: string = '';
  resultHistory: any;
  resultData: any;
  startDate: any;
  endDate: any;
  sportid = 4;
  loading: boolean = true;
  jsonWebdt: any;
  activeTab: 'today' | 'yesterday' = 'today';

  constructor(private meta: Meta) { }

  ngOnInit(): void {

    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=0' });

  }

  ngOnDestroy(): void {
    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
  }

  // getResults(sportId: any) {
  //   console.log(sportId);

  //   this.loading = true;
  //   let obj = {
  //     "startDate": this.startDate,
  //     "endDate": this.endDate,
  //     "sportId": sportId
  //   };

  //   this.dataServe.getListForResult(obj).subscribe((res: any) => {
  //     this.resultHistory = res;
  //     this.loading = false;
  //   })
  // }

}
