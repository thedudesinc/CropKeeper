import { Component } from '@angular/core';
import { faCircle, faSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faBrush,
  faEllipsisVertical,
  faEraser,
  faPencil,
  faSeedling,
} from '@fortawesome/free-solid-svg-icons';
import { FabricService } from 'src/app/services/fabric.service';

@Component({
  selector: 'app-garden-designer-toolbar',
  templateUrl: './garden-designer-toolbar.component.html',
  styleUrls: ['./garden-designer-toolbar.component.scss'],
})
export class GardenDesignerToolbarComponent {
  faPencil = faPencil;
  faEraser = faEraser;
  faSquare = faSquare;
  faCircle = faCircle;
  faDotRow = faEllipsisVertical;
  faSeedling = faSeedling;
  faBrush = faBrush;
  lineMode = false;

  constructor(private fabricService: FabricService) {}

  onPencilButtonClick(): void {
    if (!this.fabricService._canvas) return;
    if (!this.lineMode) {
      this.fabricService._canvas.on('mouse:down', (e) => {
        this.fabricService.handleMouseDown(e);
      });
      this.fabricService._canvas.on('mouse:move', (e) => {
        this.fabricService.handleMouseMove(e);
      });
      this.fabricService._canvas.on('mouse:up', (e) => {
        this.fabricService.handleMouseUp(e);
      });
      this.lineMode = true;
    } else {
      this.fabricService._canvas.off('mouse:down');
      this.fabricService._canvas.off('mouse:move');
      this.fabricService._canvas.off('mouse:up');
      this.lineMode = false;
    }
  }

  onSquareButtonClick(): void {
    this.fabricService.drawRectangle();
  }

  onCircleButtonClick(): void {
    this.fabricService.drawCircle();
  }

  onCropRowButtonClick(): void {}

  onCropSingleButtonClick(): void {}

  onTerrainButtonClick(): void {}
}
