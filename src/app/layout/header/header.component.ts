import { Component } from '@angular/core';
import { faEye, faBell } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faRectangleList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  faBell = faBell;
  faEye = faEye;
  faAngleDown = faAngleDown;
  faRectList = faRectangleList;
}
