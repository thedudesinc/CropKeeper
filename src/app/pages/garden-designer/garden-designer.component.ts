import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GardenPlotService } from 'src/app/services/garden-plot.service';
import { LoadingService } from 'src/app/services/loading.service';
import { GardenPlotOutput } from 'src/app/services/models/garden-plot.model';

@Component({
  selector: 'app-garden-designer',
  templateUrl: './garden-designer.component.html',
  styleUrls: ['./garden-designer.component.scss']
})

export class GardenDesignerComponent {

  isModalVisible = false;
  gardenPlot$?: Observable<GardenPlotOutput>;

  constructor(private route: ActivatedRoute, private gardenPlotService: GardenPlotService, private loadingService: LoadingService) { }

  ngOnInit() {
    const gardenPlotId = this.route.snapshot.paramMap.get('id');
    console.log(gardenPlotId);

    if (gardenPlotId) { // check if id exists then get gardenPlot
      this.gardenPlot$ = this.gardenPlotService.getGardenPlot(gardenPlotId);
      console.log("garden exists")
    } else { // show new garden pop-up
      this.isModalVisible = true;
      console.log("garden does not exist. create new.")
    }

  }
}
