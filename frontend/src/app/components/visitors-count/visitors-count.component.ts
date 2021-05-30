import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { visitObj } from './visitObj';

@Component({
  selector: 'app-visitors-count',
  templateUrl: './visitors-count.component.html',
  styleUrls: ['./visitors-count.component.scss']
})
export class VisitorsCountComponent implements OnInit {

  visitorsCount: any = 1;

  constructor(private client: HttpClient) { }

  ngOnInit(): void {

    this.client.get('https://viergewinnt-backend-dot-viergewinnt-ss21.ew.r.appspot.com//VisitorCount').subscribe(data => {
      this.visitorsCount = (data as visitObj).visitorCount;
    });
  }

}
