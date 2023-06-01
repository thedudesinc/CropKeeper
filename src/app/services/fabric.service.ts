import { Injectable } from '@angular/core';
import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root',
})
export class FabricService {
  public _canvas?: fabric.Canvas;

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
}
