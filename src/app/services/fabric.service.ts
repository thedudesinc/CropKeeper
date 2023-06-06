import { EventEmitter, Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FabricService {
  public _canvas?: fabric.Canvas;
  public gardenPlotSaveEmitter: EventEmitter<void> = new EventEmitter();
  public isDrawing = false;
  public line = new fabric.Line();

  constructor() {}

  redraw() {
    if (!this._canvas) return;

    this._canvas.renderAll();
  }

  resizeCanvas() {
    if (!this._canvas) return;
    this._canvas.setWidth(window.innerWidth);
    this._canvas.setHeight(window.innerHeight - 65);
    this.redraw();
  }

  handleMouseDown(event: fabric.IEvent<MouseEvent | Event>) {
    if (!this._canvas) return;
    this.isDrawing = true;
    const pointer = this._canvas.getPointer(event.e);
    const points = [pointer.x, pointer.y, pointer.x, pointer.y];

    this.line = new fabric.Line(points, {
      strokeWidth: 3,
      stroke: 'black',
    });
    this._canvas.add(this.line);
  }

  handleMouseMove(event: fabric.IEvent<MouseEvent | Event>) {
    if (!this._canvas) return;
    if (this.isDrawing) {
      const pointer = this._canvas.getPointer(event.e);
      this.line.set({ x2: pointer.x, y2: pointer.y });
      this._canvas.renderAll();
    }
  }

  handleMouseUp(event: fabric.IEvent<MouseEvent | Event>) {
    this.isDrawing = false;
  }

  drawRectangle() {
    if (!this._canvas) return;
    this._canvas.add(
      new fabric.Rect({
        width: 50,
        height: 50,
        left: 250,
        top: 250,
        stroke: 'black',
        strokeWidth: 2,
        fill: '',
      })
    );
  }

  drawCircle() {
    if (!this._canvas) return;
    this._canvas.add(
      new fabric.Circle({
        radius: 25,
        top: 250,
        left: 250,
        stroke: 'black',
        strokeWidth: 2,
        fill: '',
      })
    );
  }
}
