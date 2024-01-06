import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faBell } from '@fortawesome/free-regular-svg-icons';
import {
  faAngleDown,
  faRectangleList,
} from '@fortawesome/free-solid-svg-icons';
import { initFlowbite } from 'flowbite';
import { Observable, Subscription, filter, map, switchMap, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GardenPlotService } from 'src/app/services/garden-plot.service';
import { HeaderService } from 'src/app/services/header.service';
import { GardenPlotOutput } from 'src/app/services/models/garden-plot.model';
import { LoginResponse } from 'src/app/services/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  gardenPlotList?: GardenPlotOutput[];
  gardenPlotSubscription?: Subscription;
  user$: Observable<LoginResponse>;

  constructor(
    private gardenPlotService: GardenPlotService,
    private headerService: HeaderService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.user$ = authenticationService.user$.pipe(
      filter((user) => !!user),
      map((user) => user as LoginResponse)
    );
  }

  faBell = faBell;
  faEye = faEye;
  faAngleDown = faAngleDown;
  faRectList = faRectangleList;

  ngOnInit() {
    this.gardenPlotSubscription = this.headerService.gardenPlotListRefresh$
      .pipe(
        switchMap(() => this.user$),
        filter((user) => !!user),
        switchMap((user) =>
          this.gardenPlotService.getGardenPlotsByUserId(user.id)
        ),
        tap((gardenPlots) => (this.gardenPlotList = gardenPlots))
      )
      .subscribe();
    this.headerService.refreshGardenPlotList.next(true);
  }

  ngAfterViewInit(): void {
    // init flowbite, necessary for dropdowns to function
    initFlowbite();
  }

  onSignoutClick() {
    this.authenticationService.destroyState();
    this.router.navigate(['login']);
  }

  ngOnDestroy() {
    this.gardenPlotSubscription?.unsubscribe();
  }
}
