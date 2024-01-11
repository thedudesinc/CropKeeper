import { EventEmitter, Injectable } from '@angular/core';
import { fabric } from 'fabric';

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
  public zoom = 0;
  public isDragging = false;
  public selection = false;
  public lastPosX = 0;
  public lastPosY = 0;
  public viewportTransform = this._canvas?.viewportTransform;

  constructor() {}

  initialize() {
    this.setupResize();
    this.setupZoom();
  }

  setupResize() {
    window.addEventListener(
      'resize',
      () => {
        this.resizeCanvas();
      },
      false
    );
  }

  setupZoom() {
    if (!this._canvas) return;
    this._canvas.on('mouse:wheel', (opt) => {
      if (!this._canvas) return;
      const delta = opt.e.deltaY;
      let zoom = this._canvas?.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      this._canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  }

  panMouseDown(event: fabric.IEvent<MouseEvent>) {
    let evt = event.e;
    if (event.button === 3) {
      this.isDragging = true;
      this.selection = false;
      this.lastPosX = evt.clientX;
      this.lastPosY = evt.clientY;
    }
  }

  panMouseMove(event: fabric.IEvent<MouseEvent>) {
    if (this.isDragging) {
      let e = event.e;
      let vpt = this._canvas?.viewportTransform;
      if (!vpt) return;
      vpt[4] += e.clientX - this.lastPosX;
      vpt[5] += e.clientY - this.lastPosY;
      this.redraw(); //was previously requestRenderAll() an undefined method.
      this.lastPosX = e.clientX;
      this.lastPosY = e.clientY;
    }
  }

  panMouseUp(event: fabric.IEvent<MouseEvent>) {
    this.isDragging = false;
    this.selection = true;
  }

  setViewportTransform(vpt: number[]) {
    if (!this._canvas) return;
    if (this.zoom < 400 / 1000) {
      vpt[4] = 200 - (1000 * this.zoom) / 2;
      vpt[5] = 200 - (1000 * this.zoom) / 2;
    } else {
      if (vpt[4] >= 0) {
        vpt[4] = 0;
      } else if (vpt[4] < this._canvas.getWidth() - 1000 * this.zoom) {
        vpt[4] = this._canvas.getWidth() - 1000 * this.zoom;
      }
      if (vpt[5] >= 0) {
        vpt[5] = 0;
      } else if (vpt[5] < this._canvas.getHeight() - 1000 * this.zoom) {
        vpt[5] = this._canvas.getHeight() - 1000 * this.zoom;
      }
    }
  }

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

  drawLineMouseDown(event: fabric.IEvent<MouseEvent>) {
    if (!this._canvas) return;
    if (event.button === 3) return;
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

  drawLineMouseMove(event: fabric.IEvent<MouseEvent>) {
    if (!this._canvas) return;
    if (!this.isDrawing) return;
    const pointer = this._canvas.getPointer(event.e);
    this.line.set({ x2: pointer.x, y2: pointer.y });
    this._canvas.renderAll();
  }

  drawLineMouseUp(event: fabric.IEvent<MouseEvent>) {
    if (!this._canvas) return;
    this.isDrawing = false;
    this._canvas.selection = true;
  }

  drawRectangleMouseDown(event: fabric.IEvent<MouseEvent>) {
    if (!this._canvas) return;
    if (event.button === 3) return;
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

  drawRectangleMouseMove(event: fabric.IEvent<MouseEvent>) {
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

  drawRectangleMouseUp(event: fabric.IEvent<MouseEvent>) {
    if (!this._canvas) return;
    this.isDrawing = false;
    this._canvas.selection = true;
  }

  drawEllipseMouseDown(event: fabric.IEvent<MouseEvent>) {
    if (!this._canvas) return;
    if (event.button === 3) return;
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

  drawEllipseMouseMove(event: fabric.IEvent<MouseEvent>) {
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

  drawEllipseMouseUp(event: fabric.IEvent<MouseEvent>) {
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
