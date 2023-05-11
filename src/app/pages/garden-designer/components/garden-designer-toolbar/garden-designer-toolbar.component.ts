import { Component } from '@angular/core';
import { faCircle, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faBrush, faEllipsisVertical, faEraser, faPencil, faSeedling, } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-garden-designer-toolbar',
  templateUrl: './garden-designer-toolbar.component.html',
  styleUrls: ['./garden-designer-toolbar.component.scss']
})
export class GardenDesignerToolbarComponent {
  faPencil = faPencil;
  faEraser = faEraser;
  faSquare = faSquare;
  faCircle = faCircle;
  faDotRow = faEllipsisVertical;
  faSeedling = faSeedling;
  faBrush = faBrush;
}
