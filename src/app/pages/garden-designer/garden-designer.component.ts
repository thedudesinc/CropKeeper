import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCircle, faSquareFull } from '@fortawesome/free-regular-svg-icons';
import { faAnglesRight, faBrush, faEllipsisVertical, faEraser, faPencil, faRotateLeft, faRotateRight, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { Observable, map, of } from 'rxjs';
import { GardenPlotService } from 'src/app/services/garden-plot.service';
import { LoadingService } from 'src/app/services/loading.service';
import { GardenPlotOutput } from 'src/app/services/models/garden-plot.model';

@Component({
  selector: 'app-garden-designer',
  templateUrl: './garden-designer.component.html',
  styleUrls: ['./garden-designer.component.scss']
})

export class GardenDesignerComponent {
  faRotateLeft = faRotateLeft;
  faRotateRight = faRotateRight;
  faAnglesRight = faAnglesRight;
  faPencil = faPencil;
  faEraser = faEraser;
  faSquare = faSquareFull;
  faCircle = faCircle;
  faDotRow = faEllipsisVertical;
  faSeedling = faSeedling;
  faBrush = faBrush;

  gardenPlot$?: Observable<GardenPlotOutput>;

  constructor(private route: ActivatedRoute, private gardenPlotService: GardenPlotService, private loadingService: LoadingService) { }

  ngOnInit() {
    const gardenPlotId = this.route.snapshot.paramMap.get('id');
    console.log(gardenPlotId);

    if (gardenPlotId) { // check if id exists then get gardenPlot
      this.gardenPlot$ = this.gardenPlotService.getGardenPlot(gardenPlotId);
      console.log("garden exists")
    }
    else { // show new garden pop-up
      this.gardenPlot$ = of({
        id: '1',
        userId: '12',
        fabricJson: 'jsonStuff',
        plotName: 'firstOne',
        hardinessZone: 5,
        lastFrostDate: new Date(),
        zipCode: 12345,
        notes: null,
        dateCreated: new Date(),
        dateModified: new Date(),
        dateDeleted: null
      });
      console.log("garden does not exist. create new.")
    }

  }
}
