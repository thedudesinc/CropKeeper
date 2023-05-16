import { Component, OnInit } from '@angular/core';
import { faEye, faBell } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { GardenPlotService } from 'src/app/services/garden-plot.service';
import { GardenPlotOutput } from 'src/app/services/models/garden-plot.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  gardenPlotList$?: Observable<GardenPlotOutput[]>;

  constructor(private gardenPlotService: GardenPlotService) { }

  faBell = faBell;
  faEye = faEye;
  faAngleDown = faAngleDown;
  faRectList = faRectangleList;

  ngOnInit() {
    this.gardenPlotList$ = this.gardenPlotService.getAllGardenPlots();
  }
}

