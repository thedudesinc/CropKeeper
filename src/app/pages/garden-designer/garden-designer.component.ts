import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { ControlsOf } from 'src/app/helpers/helper.types';
import { GardenPlotService } from 'src/app/services/garden-plot.service';
import { LoadingService } from 'src/app/services/loading.service';
import { GardenPlotOutput, GardenPlotPartialInput } from 'src/app/services/models/garden-plot.model';

@Component({
  selector: 'app-garden-designer',
  templateUrl: './garden-designer.component.html',
  styleUrls: ['./garden-designer.component.scss']
})

export class GardenDesignerComponent {
  newGardenForm: FormGroup<ControlsOf<GardenPlotPartialInput>> = new FormGroup<ControlsOf<GardenPlotPartialInput>>({
    plotName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)] }),
    zipCode: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)] }),
    notes: new FormControl('', { nonNullable: true }),
    fabricJson: new FormControl('', { nonNullable: true })
  });

  get plotName() { return this.newGardenForm.get('plotName'); }
  get zipCode() { return this.newGardenForm.get('zipCode'); }
  get notes() { return this.newGardenForm.get('notes'); }
  get fabricJson() { return this.newGardenForm.get('fabricJson'); }

  gardenPlot$?: Observable<GardenPlotOutput>;

  constructor(private route: ActivatedRoute, private gardenPlotService: GardenPlotService, private loadingService: LoadingService) { }

  // submit new garden form and initialize a new garden in the database.
  onSubmit(): void {
    this.loadingService.changeLoadingVisible.next(true);
    this.gardenPlotService.Create(this.newGardenForm.getRawValue()).subscribe((response) => {
      this.loadingService.changeLoadingVisible.next(false);
    });
  }

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
