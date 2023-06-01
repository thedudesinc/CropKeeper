import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { fabric } from 'fabric';
import { Observable, of, switchMap, tap } from 'rxjs';
import { FabricService } from 'src/app/services/fabric.service';
import { GardenPlotService } from 'src/app/services/garden-plot.service';
import { LoadingService } from 'src/app/services/loading.service';
import {
  GardenPlotOutput,
  GardenPlotPartialInput,
} from 'src/app/services/models/garden-plot.model';

@Component({
  selector: 'app-garden-designer',
  templateUrl: './garden-designer.component.html',
  styleUrls: ['./garden-designer.component.scss'],
})
export class GardenDesignerComponent implements OnInit {
  isModalVisible = false;
  gardenPlot$: Observable<GardenPlotOutput>;
  gardenPlot?: GardenPlotOutput;

  constructor(
    route: ActivatedRoute,
    private gardenPlotService: GardenPlotService,
    private loadingService: LoadingService,
    private fabricService: FabricService
  ) {
    this.gardenPlot$ = route.params.pipe(
      switchMap((params) => {
        const gardenPlotId = params['id'];

        if (gardenPlotId) {
          // check if id exists then get gardenPlot
          this.isModalVisible = false;
          return this.gardenPlotService.getGardenPlot(gardenPlotId);
        } else {
          // show new garden pop-up
          this.isModalVisible = true;
          return of({} as GardenPlotOutput);
        }
      }),
      tap((gardenPlot) => {
        if (gardenPlot && gardenPlot.fabricJson) {
          this.fabricService._canvas = new fabric.Canvas(
            'fabricSurface'
          ).loadFromJSON(gardenPlot.fabricJson, () => console.log('toast'));
          this.fabricService.resizeCanvas();
        } else {
          this.fabricService._canvas = new fabric.Canvas('fabricSurface', {
            backgroundColor: '#ebebef',
          });
          this.fabricService._canvas?.add(
            new fabric.Rect({
              left: 100,
              top: 100,
              fill: 'red',
              width: 100,
              height: 100,
            })
          );
          this.fabricService._canvas?.renderAll();
          console.log('gardenComponent', this.fabricService._canvas);
          this.fabricService.resizeCanvas();
          window.addEventListener(
            'resize',
            () => {
              console.log('resized');
              this.fabricService.resizeCanvas();
            },
            false
          );
        }
        this.gardenPlot = gardenPlot;
      })
    );
  }

  ngOnInit(): void {
    this.gardenPlot$.subscribe();
  }

  onSaveEvent(formData: GardenPlotPartialInput): void {
    this.loadingService.changeLoadingVisible.next(true);
    if (!formData.id) {
      this.gardenPlotService
        .create({
          ...formData,
          fabricJson: JSON.stringify(this.fabricService._canvas?.toJSON()),
        })
        .subscribe((response) => {
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
