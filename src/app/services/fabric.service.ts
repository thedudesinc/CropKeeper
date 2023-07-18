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
  public isErasing = false;
  public line = new fabric.Line();
  public rectangle = new fabric.Rect();
  public ellipse = new fabric.Ellipse();
  public eraserAreaCircle = new fabric.Circle();
  public eraserRadius = 10;
  public x_coord = 0;
  public y_coord = 0;

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
    this._canvas.selection = false;
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
    if (!this.isDrawing) return;
    const pointer = this._canvas.getPointer(event.e);
    this.line.set({ x2: pointer.x, y2: pointer.y });
    this._canvas.renderAll();
  }

  drawLineMouseUp(event: fabric.IEvent<MouseEvent | Event>) {
    if (!this._canvas) return;
    this.isDrawing = false;
    this._canvas.selection = true;
  }

  drawRectangleMouseDown(event: fabric.IEvent<MouseEvent | Event>) {
    if (!this._canvas) return;
    this.isDrawing = true;
    this._canvas.selection = false;
    const pointer = this._canvas.getPointer(event.e);
    this.x_coord = pointer.x;
    this.y_coord = pointer.y;

    this.rectangle = new fabric.Rect({
      left: this.x_coord,
      top: this.y_coord,
      originX: 'left',
      originY: 'top',
      width: pointer.x - this.x_coord,
      height: pointer.y - this.y_coord,
      stroke: 'black',
      strokeWidth: 3,
      strokeUniform: true,
      fill: '',
    });
    this._canvas.add(this.rectangle);
  }

  drawRectangleMouseMove(event: fabric.IEvent<MouseEvent | Event>) {
    if (!this._canvas) return;
    if (!this.isDrawing) return;
    const pointer = this._canvas.getPointer(event.e);
    if (this.x_coord > pointer.x) {
      this.rectangle.set({ left: Math.abs(pointer.x) });
    }
    if (this.y_coord > pointer.y) {
      this.rectangle.set({ top: Math.abs(pointer.y) });
    }

    this.rectangle.set({ width: Math.abs(this.x_coord - pointer.x) });
    this.rectangle.set({ height: Math.abs(this.y_coord - pointer.y) });

    this._canvas.renderAll();
  }

  drawRectangleMouseUp(event: fabric.IEvent<MouseEvent | Event>) {
    if (!this._canvas) return;
    this.isDrawing = false;
    this._canvas.selection = true;
  }

  drawEllipseMouseDown(event: fabric.IEvent<MouseEvent | Event>) {
    if (!this._canvas) return;
    this.isDrawing = true;
    this._canvas.selection = false;
    const pointer = this._canvas.getPointer(event.e);
    this.x_coord = pointer.x;
    this.y_coord = pointer.y;

    this.ellipse = new fabric.Ellipse({
      left: this.x_coord,
      top: this.y_coord,
      originX: 'left',
      originY: 'top',
      rx: pointer.x - this.x_coord,
      ry: pointer.y - this.y_coord,
      stroke: 'black',
      strokeWidth: 3,
      strokeUniform: true,
      fill: '',
    });
    this._canvas.add(this.ellipse);
  }

  drawEllipseMouseMove(event: fabric.IEvent<MouseEvent | Event>) {
    if (!this._canvas) return;
    if (!this.isDrawing) return;
    const pointer = this._canvas.getPointer(event.e);
    if (this.x_coord > pointer.x) {
      this.ellipse.set({ left: Math.abs(pointer.x) });
    }
    if (this.y_coord > pointer.y) {
      this.ellipse.set({ top: Math.abs(pointer.y) });
    }

    this.ellipse.set({ rx: Math.abs((this.x_coord - pointer.x) / 2) });
    this.ellipse.set({ ry: Math.abs((this.y_coord - pointer.y) / 2) });

    this._canvas.renderAll();
  }

  drawEllipseMouseUp(event: fabric.IEvent<MouseEvent | Event>) {
    if (!this._canvas) return;
    this.isDrawing = false;
    this._canvas.selection = true;
  }

  deleteSelection() {
    if (!this._canvas) return;
    var selected = this._canvas.getActiveObjects();
    if (selected) {
      if (confirm('Deleted selected?')) {
        this._canvas.remove(...selected);
      }
      this._canvas.discardActiveObject().renderAll();
    }
  }
}
