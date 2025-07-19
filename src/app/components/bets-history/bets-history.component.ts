import { Component, OnInit , OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ProfileLeftCompComponent } from '../profile-left-comp/profile-left-comp.component';

@Component({
  selector: 'app-bets-history',
  imports:[CommonModule,ProfileLeftCompComponent,RouterLink],
  templateUrl: './bets-history.component.html',
  styleUrls: ['./bets-history.component.css']
})
export class BetsHistoryComponent implements OnInit , OnDestroy {

  betAllHistory: any;
  betHistoryData: any;
  currentDate = new Date().toISOString().slice(0, 10);
  currentTime = new Date().getHours() + ":" + new Date().getMinutes();
  startDate : any;
  yesterday : any;
  currentPage = 1;
  pages: number[] = [1, 2, 3, 4, 5];
  totalPages :any;
  expand : any;
  expandcheck = false;
  loading: boolean = true;

  constructor( private activeRoute: ActivatedRoute,private meta: Meta) { }

  ngOnInit(): void {

    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=0' });
  }

  ngOnDestroy(): void {
    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
  }

}
