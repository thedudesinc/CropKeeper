import { EventEmitter, Injectable } from '@angular/core';
import { faB } from '@fortawesome/free-solid-svg-icons';
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
  public rectangle = new fabric.Rect();
  public circle = new fabric.Circle();

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

  drawLineMouseDown(event: fabric.IEvent<MouseEvent | Event>) {
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

  drawLineMouseMove(event: fabric.IEvent<MouseEvent | Event>) {
    if (!this._canvas) return;
    if (this.isDrawing) {
      const pointer = this._canvas.getPointer(event.e);
      this.line.set({ x2: pointer.x, y2: pointer.y });
      this._canvas.renderAll();
    }
  }

  drawLineMouseUp(event: fabric.IEvent<MouseEvent | Event>) {
    this.isDrawing = false;
  }

  drawRectangleMouseDown(event: fabric.IEvent<MouseEvent | Event>) {
    if (!this._canvas) return;
    this.isDrawing = true;
    const pointer = this._canvas.getPointer(event.e);
    const points = [pointer.x, pointer.y, pointer.x, pointer.y];

    this.rectangle = new fabric.Rect({
      left: points[0],
      top: points[1],
      stroke: 'black',
      strokeWidth: 2,
      strokeUniform: true,
      fill: '',
    });
    this._canvas.add(this.rectangle);
  }

  drawRectangleMouseMove(event: fabric.IEvent<MouseEvent | Event>) {
    if (!this._canvas) return;
    if (this.isDrawing) {
      const pointer = this._canvas.getPointer(event.e);
      this.rectangle.this._canvas.renderAll();
    }
  }

  drawRectangleMouseUp(event: fabric.IEvent<MouseEvent | Event>) {}

  drawCircleMouseDown(event: fabric.IEvent<MouseEvent | Event>) {}

  drawCircleMouseUp(event: fabric.IEvent<MouseEvent | Event>) {}

  drawCircleMouseMove(event: fabric.IEvent<MouseEvent | Event>) {}

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
        strokeUniform: true,
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
        strokeUniform: true,
        fill: '',
      })
    );
  }
}
