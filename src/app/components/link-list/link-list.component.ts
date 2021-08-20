import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LinksData } from 'src/app/models/links-data';
import { LinksDataService } from 'src/app/services/links-data.service';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css'],
})
export class LinkListComponent implements OnInit, OnDestroy {
  dataSource: LinksData | null = null;
  pageEvent: PageEvent | null = null;
  subscription: Subscription = new Subscription();
  displayedColumns: string[] = ['id', 'long_url', 'link'];

  constructor(private linksDataService: LinksDataService) {}

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource(): void {
    this.subscription.add(
      this.linksDataService
        .findAll(5, 1)
        .pipe(
          tap((links) => console.log(links)),
          map((linksData: LinksData) => (this.dataSource = linksData))
        )
        .subscribe()
    );
  }

  onPaginationChange(event: PageEvent): void {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page + 1;

    this.subscription.add(
      this.linksDataService
        .findAll(size, page)
        .pipe(map((linksData: LinksData) => (this.dataSource = linksData)))
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
