import { Component } from '@angular/core';
import { faAnglesRight, faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-garden-designer-titlebar',
  templateUrl: './garden-designer-titlebar.component.html',
  styleUrls: ['./garden-designer-titlebar.component.scss']
})
export class GardenDesignerTitlebarComponent {
  faRotateLeft = faRotateLeft;
  faRotateRight = faRotateRight;
  faAnglesRight = faAnglesRight;

}
