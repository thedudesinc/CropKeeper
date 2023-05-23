import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { GardenPlotService } from 'src/app/services/garden-plot.service';
import { LoadingService } from 'src/app/services/loading.service';
import { GardenPlotOutput, GardenPlotPartialInput } from 'src/app/services/models/garden-plot.model';

@Component({
  selector: 'app-garden-designer',
  templateUrl: './garden-designer.component.html',
  styleUrls: ['./garden-designer.component.scss']
})
export class GardenDesignerComponent {

  isModalVisible = false;
  gardenPlot$?: Observable<GardenPlotOutput>;
  routerEvent$: Observable<Params>;

  constructor(route: ActivatedRoute, private gardenPlotService: GardenPlotService, private loadingService: LoadingService) {
    this.routerEvent$ = route.params.pipe(tap((params) => {
      const gardenPlotId = params['id'];

      if (gardenPlotId) { // check if id exists then get gardenPlot
        this.isModalVisible = false;
        this.gardenPlot$ = this.gardenPlotService.getGardenPlot(gardenPlotId);
      } else { // show new garden pop-up
        this.isModalVisible = true;
      }
    }));
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

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
}
