import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fabric } from 'fabric';
import { Observable, filter, of, switchMap, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
    private fabricService: FabricService,
    private authenticationService: AuthenticationService
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
        this.fabricService._canvas?.dispose();
        if (gardenPlot && gardenPlot.fabricJson) {
          this.fabricService._canvas = new fabric.Canvas(
            'fabricSurface'
          ).loadFromJSON(gardenPlot.fabricJson, () => {
            console.log('toast');
          });
        } else {
          this.fabricService._canvas = new fabric.Canvas('fabricSurface', {
            backgroundColor: '#ebebef',
          });

          window.addEventListener(
            'resize',
            () => {
              this.fabricService.resizeCanvas();
            },
            false
          );
        }
        this.gardenPlot = gardenPlot;
        this.fabricService.resizeCanvas();
      })
    );
  }

  ngOnInit(): void {
    this.gardenPlot$.subscribe();
  }

  onSaveEvent(formData: GardenPlotPartialInput): void {
    this.loadingService.changeLoadingVisible.next(true);
    if (!formData.id) {
      this.authenticationService.user$
        .pipe(
          filter((user) => !!user),
          switchMap((user) =>
            this.gardenPlotService.create({
              ...formData,
              userId: user!.id,
              fabricJson: JSON.stringify(this.fabricService._canvas?.toJSON()),
            })
          )
        )
        .subscribe((response) => {
          this.loadingService.changeLoadingVisible.next(false);
          this.isModalVisible = false;
          this.gardenPlot = response;
        });
    } else {
      this.gardenPlotService
        .update({
          ...formData,
          fabricJson: JSON.stringify(this.fabricService._canvas?.toJSON()),
        })
        .subscribe((response) => {
          this.loadingService.changeLoadingVisible.next(false);
          this.isModalVisible = false;
          this.gardenPlot = response;
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
