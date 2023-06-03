import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import {
  faAnglesRight,
  faRotateLeft,
  faRotateRight,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FabricService } from 'src/app/services/fabric.service';
import { GardenPlotService } from 'src/app/services/garden-plot.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-garden-designer-titlebar',
  templateUrl: './garden-designer-titlebar.component.html',
  styleUrls: ['./garden-designer-titlebar.component.scss'],
})
export class GardenDesignerTitlebarComponent {
  faRotateLeft = faRotateLeft;
  faRotateRight = faRotateRight;
  faAnglesRight = faAnglesRight;
  faTrashCan = faTrash;
  faSave = faSave;

  constructor(
    private gardenPlotService: GardenPlotService,
    private router: Router,
    private headerService: HeaderService,
    private fabricService: FabricService
  ) {}

  @Input()
  title?: string;

  @Input()
  gardenPlotId?: string;

  @Output()
  titleClickEventEmitter: EventEmitter<void> = new EventEmitter();

  onTitleClick(): void {
    this.titleClickEventEmitter.emit();
  }

  onTrashClick(): void {
    if (confirm('Are you sure to delete') && this.gardenPlotId) {
      this.gardenPlotService.delete(this.gardenPlotId).subscribe(() => {
        this.headerService.refreshGardenPlotList.next(true);
        this.router.navigate(['/designer']);
      });
    }
  }

  onSaveClick(): void {
    this.fabricService.gardenPlotSaveEmitter.emit();
  }
}
