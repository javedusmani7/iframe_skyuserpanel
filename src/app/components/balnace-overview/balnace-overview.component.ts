import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ProfileLeftCompComponent } from '../profile-left-comp/profile-left-comp.component';

@Component({
  selector: 'app-balance-overview',
  imports: [CommonModule,ProfileLeftCompComponent],
  templateUrl: './balnace-overview.component.html',
  styleUrls: ['./balnace-overview.component.css']
})
export class BalnaceOverviewComponent implements OnInit, OnDestroy {
  balInfo: any;

  constructor(private meta: Meta) { }

  ngOnInit(): void {

    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=0' });

  }

  ngOnDestroy(): void {
    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
  }


}
