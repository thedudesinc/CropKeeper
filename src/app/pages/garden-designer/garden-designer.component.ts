import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { GardenPlotService } from 'src/app/services/garden-plot.service';
import { LoadingService } from 'src/app/services/loading.service';
import { GardenPlotOutput, GardenPlotPartialInput } from 'src/app/services/models/garden-plot.model';

@Component({
  selector: 'app-garden-designer',
  templateUrl: './garden-designer.component.html',
  styleUrls: ['./garden-designer.component.scss']
})
export class GardenDesignerComponent implements OnInit {

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

  onSaveEvent(formData: GardenPlotPartialInput): void {
    this.loadingService.changeLoadingVisible.next(true);
    if (!formData.id) {
      this.gardenPlotService.create(formData).subscribe((response) => {
        this.loadingService.changeLoadingVisible.next(false);
        this.isModalVisible = false;
      });
    } else {
      this.gardenPlotService.update(formData).subscribe((response) => {
        this.loadingService.changeLoadingVisible.next(false);
        this.isModalVisible = false;
      });
    }
  }

  onTitleClick(): void {
    this.isModalVisible = true;
  }
}
