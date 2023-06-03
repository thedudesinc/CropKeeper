import { EventEmitter, Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FabricService {
  public _canvas?: fabric.Canvas;
  public gardenPlotSaveEmitter: EventEmitter<void> = new EventEmitter();

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

  createRectangle() {
    this._canvas?.add(
      new fabric.Rect({
        backgroundColor: 'black',
        angle: 45,
        height: 250,
        width: 250,
        top: 500,
        left: 500,
      })
    );
  }
}
