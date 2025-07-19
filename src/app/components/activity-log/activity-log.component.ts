import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ProfileLeftCompComponent } from '../profile-left-comp/profile-left-comp.component';

@Component({
  selector: 'app-activity-log',
  imports:[CommonModule,ProfileLeftCompComponent],
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit, OnDestroy {

  activityLog: any;
  currentPage = 1;
  loading: boolean = true;
  pages: number[] = [1, 2, 3, 4, 5];
  totalPages : any;

  constructor( private meta: Meta) { }

  ngOnInit(): void {

    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=0' });


  }

  ngOnDestroy(): void {
    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
  }

}
