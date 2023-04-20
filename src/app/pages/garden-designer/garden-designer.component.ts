import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GardenPlotService } from 'src/app/services/garden-plot.service';
import { GardenPlotOutput } from 'src/app/services/models/garden-plot.model';

@Component({
  selector: 'app-garden-designer',
  templateUrl: './garden-designer.component.html',
  styleUrls: ['./garden-designer.component.scss']
})

export class GardenDesignerComponent {
  gardenPlot$?: Observable<GardenPlotOutput>;

  constructor(private route: ActivatedRoute, private service: GardenPlotService) { }

  ngOnInit() {
    const gardenPlotId = this.route.snapshot.paramMap.get('id');
    console.log(gardenPlotId);

    if (gardenPlotId) {
      this.gardenPlot$ = this.service.getGardenPlot(gardenPlotId);
      console.log("garden exists")
    }
    else {
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
