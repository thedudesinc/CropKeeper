import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlsOf } from '../../../../helpers/helper.types';
import { GardenPlotPartialInput } from '../../../../services/models/garden-plot.model';

@Component({
  selector: 'app-garden-designer-modal',
  templateUrl: './garden-designer-modal.component.html',
  styleUrls: ['./garden-designer-modal.component.scss']
})
export class GardenDesignerModalComponent implements OnInit {
  @Input()
  isVisible = false;

  @Input()
  gardenPlot?: GardenPlotPartialInput;

  @Output()
  saveEventEmitter: EventEmitter<GardenPlotPartialInput> = new EventEmitter<GardenPlotPartialInput>();

  @Output()
  closeEventEmitter: EventEmitter<void> = new EventEmitter<void>();

  gardenPropertiesForm: FormGroup<ControlsOf<GardenPlotPartialInput>> = new FormGroup<ControlsOf<GardenPlotPartialInput>>({
    id: new FormControl(),
    plotName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)] }),
    zipCode: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)] }),
    notes: new FormControl('', { nonNullable: true }),
    fabricJson: new FormControl('', { nonNullable: true })
  });

  get plotName() { return this.gardenPropertiesForm.get('plotName'); }
  get zipCode() { return this.gardenPropertiesForm.get('zipCode'); }
  get notes() { return this.gardenPropertiesForm.get('notes'); }
  get fabricJson() { return this.gardenPropertiesForm.get('fabricJson'); }

  constructor() { }

  ngOnInit(): void {
    if (this.gardenPlot) { this.gardenPropertiesForm.patchValue(this.gardenPlot) }
  }

  onSubmit(): void {
    this.saveEventEmitter.emit(this.gardenPropertiesForm.getRawValue());
  }

  onClose(): void {
    this.closeEventEmitter.emit();
  }
}
