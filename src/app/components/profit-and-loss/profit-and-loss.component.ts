import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ProfileLeftCompComponent } from '../profile-left-comp/profile-left-comp.component';

@Component({
  selector: 'app-profit-and-loss',
  imports:[CommonModule,ProfileLeftCompComponent,RouterLink],
  templateUrl: './profit-and-loss.component.html',
  styleUrls: ['./profit-and-loss.component.css']
})

export class ProfitAndLossComponent implements OnInit, OnDestroy {
expand=false
  constructor(private activeRoute: ActivatedRoute, private meta: Meta) { }

  ngOnInit(): void {

    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=0' });


  }

  ngOnDestroy(): void {
    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
  }
  details(){
    this.expand=!this.expand
  }
}
