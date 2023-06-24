import { Component, HostListener } from '@angular/core';
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
  DRAW_ELLIPSE = 'drawEllipse',
}

@Component({
  selector: 'app-garden-designer-toolbar',
  templateUrl: './garden-designer-toolbar.component.html',
  styleUrls: ['./garden-designer-toolbar.component.scss'],
})
export class GardenDesignerToolbarComponent {
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvents(event: KeyboardEvent) {
    switch (event.key) {
      case 'Delete':
        const activeObjects =
          this.fabricService._canvas?.getActiveObjects() ?? [];
        activeObjects.forEach((object) =>
          this.fabricService._canvas!.remove(object)
        );
        break;
      case 'Escape':
        this.activeTool = ToolType.NONE;
        this.handleMouseEvent();
        break;
      default:
    }
  }

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
    drawEllipse: {
      mouseUp: this.fabricService.drawEllipseMouseUp,
      mouseDown: this.fabricService.drawEllipseMouseDown,
      mouseMove: this.fabricService.drawEllipseMouseMove,
    },
  };

  constructor(private fabricService: FabricService) {}

  handleMouseEvent(): void {
    if (!this.fabricService._canvas) return;

    this.fabricService._canvas.off('mouse:down');
    this.fabricService._canvas.off('mouse:move');
    this.fabricService._canvas.off('mouse:up');

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
