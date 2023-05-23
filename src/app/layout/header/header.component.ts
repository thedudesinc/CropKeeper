import { Component, OnDestroy, OnInit } from '@angular/core';
import { faEye, faBell } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { Subscription, switchMap, tap } from 'rxjs';
import { GardenPlotService } from 'src/app/services/garden-plot.service';
import { HeaderService } from 'src/app/services/header.service';
import { GardenPlotOutput } from 'src/app/services/models/garden-plot.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  gardenPlotList?: GardenPlotOutput[];
  gardenPlotSubscription?: Subscription;

  constructor(private gardenPlotService: GardenPlotService, private headerService: HeaderService) { }

  faBell = faBell;
  faEye = faEye;
  faAngleDown = faAngleDown;
  faRectList = faRectangleList;

  ngOnInit() {
    this.gardenPlotSubscription = this.headerService.gardenPlotListRefresh$.pipe(switchMap(() => this.gardenPlotService.getAllGardenPlots()), tap((gardenPlots) => this.gardenPlotList = gardenPlots)).subscribe();
    this.headerService.refreshGardenPlotList.next(true);
  }

  ngOnDestroy() {
    this.gardenPlotSubscription?.unsubscribe();
  }
}

