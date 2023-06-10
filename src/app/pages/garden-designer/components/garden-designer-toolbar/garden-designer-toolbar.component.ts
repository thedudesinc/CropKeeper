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

export enum ToolType {
  NONE = '',
  DRAW_LINE = 'drawLine',
  DRAW_RECTANGLE = 'drawRectangle',
  DRAW_CIRCLE = 'drawCircle',
}

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
  activeTool: ToolType = ToolType.NONE;
  toolTypeEnum = ToolType;
  toolFunctionMap: {
    [id: string]: {
      mouseUp: (event: fabric.IEvent<MouseEvent | Event>) => void;
      mouseDown: (event: fabric.IEvent<MouseEvent | Event>) => void;
      mouseMove: (event: fabric.IEvent<MouseEvent | Event>) => void;
    };
  } = {
    drawLine: {
      mouseUp: this.fabricService.drawLineMouseUp,
      mouseDown: this.fabricService.drawLineMouseDown,
      mouseMove: this.fabricService.drawLineMouseMove,
    },
    drawRectangle: {
      mouseUp: this.fabricService.drawRectangleMouseUp,
      mouseDown: this.fabricService.drawRectangleMouseDown,
      mouseMove: this.fabricService.drawRectangleMouseMove,
    },
    drawCircle: {
      mouseUp: this.fabricService.drawCircleMouseUp,
      mouseDown: this.fabricService.drawCircleMouseDown,
      mouseMove: this.fabricService.drawCircleMouseMove,
    },
  };

  constructor(private fabricService: FabricService) {}

  handleMouseEvent(): void {
    if (!this.fabricService._canvas) return;
    if (this.activeTool) {
      this.fabricService._canvas.on(
        'mouse:up',
        this.toolFunctionMap[this.activeTool].mouseUp.bind(this.fabricService)
      );
      this.fabricService._canvas.on(
        'mouse:down',
        this.toolFunctionMap[this.activeTool].mouseDown.bind(this.fabricService)
      );
      this.fabricService._canvas.on(
        'mouse:move',
        this.toolFunctionMap[this.activeTool].mouseMove.bind(this.fabricService)
      );
    } else {
      this.fabricService._canvas.off('mouse:down');
      this.fabricService._canvas.off('mouse:move');
      this.fabricService._canvas.off('mouse:up');
    }
  }

  onToolButtonClick(toolName: ToolType): void {
    if (this.activeTool === toolName) {
      this.activeTool = ToolType.NONE;
    } else {
      this.activeTool = toolName;
    }
    this.handleMouseEvent();
  }
}
