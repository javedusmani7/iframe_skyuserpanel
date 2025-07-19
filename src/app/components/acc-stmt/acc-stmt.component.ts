import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ProfileLeftCompComponent } from '../profile-left-comp/profile-left-comp.component';

@Component({
  selector: 'app-acc-stmt',
  imports:[CommonModule,ProfileLeftCompComponent],
  templateUrl: './acc-stmt.component.html',
  styleUrls: ['./acc-stmt.component.css']
})

export class AccStmtComponent implements OnInit, OnDestroy{
    accountStmt : any;
    currentPage = 1;
    loading: boolean = true;
    pages: number[] = [1, 2, 3, 4, 5];
    totalPages : any;
    disable = false
    enblPrev =false

    constructor(private meta: Meta){}

    ngOnInit(): void {

      this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=0' });
    }

    ngOnDestroy(): void {
      this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
    }



}
