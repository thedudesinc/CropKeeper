import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlsOf } from '../../helpers/helper.types';
import { GardenPlotPartialInput } from '../../services/models/garden-plot.model';
import { GardenPlotService } from '../../services/garden-plot.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-garden-designer-modal',
  templateUrl: './garden-designer-modal.component.html',
  styleUrls: ['./garden-designer-modal.component.scss']
})
export class GardenDesignerModalComponent {

  gardenPropertiesForm: FormGroup<ControlsOf<GardenPlotPartialInput>> = new FormGroup<ControlsOf<GardenPlotPartialInput>>({
    plotName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)] }),
    zipCode: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)] }),
    notes: new FormControl('', { nonNullable: true }),
    fabricJson: new FormControl('', { nonNullable: true })
  });

  get plotName() { return this.gardenPropertiesForm.get('plotName'); }
  get zipCode() { return this.gardenPropertiesForm.get('zipCode'); }
  get notes() { return this.gardenPropertiesForm.get('notes'); }
  get fabricJson() { return this.gardenPropertiesForm.get('fabricJson'); }

  constructor(private gardenPlotService: GardenPlotService, private loadingService: LoadingService) { }

  onSubmit(): void {
    this.loadingService.changeLoadingVisible.next(true);
    this.gardenPlotService.Create(this.gardenPropertiesForm.getRawValue()).subscribe((response) => {
      this.loadingService.changeLoadingVisible.next(false);
    });
  }
}
