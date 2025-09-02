import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LeftSideCompComponent } from "../left-side-comp/left-side-comp.component";
import { RightSideCompComponent } from "../right-side-comp/right-side-comp.component";
import { DesktopFooterComponent } from '../desktop-footer/desktop-footer.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataHandlerService } from '../../services/datahandler.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-common-sport',
  imports: [CommonModule, LeftSideCompComponent, RightSideCompComponent, DesktopFooterComponent, RouterLink],
  templateUrl: './common-sport.component.html',
  styleUrl: './common-sport.component.css'
})
export class CommonSportComponent {
  private api = inject(DataHandlerService);
  private toastr = inject(ToastrService);
  private route = inject(ActivatedRoute);

  matches: any[] = [];
  loading: boolean = true;
  error: string = '';

  // pagination
  pageNumber: number = 1;
  pageSize: number = 200;
  totalRecords: number = 0;
  status: number = 1;
  sportId: any;
  

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
     this.sportId = params.get('id');
    if (this.sportId) {
      this.fetchMatches();
    }
  });
  }

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
        this.matches = res?.data?.data || [];
        this.loading = false;
      }
    });
  }

}
