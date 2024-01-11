import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-garden-designer-sidebar',
  templateUrl: './garden-designer-sidebar.component.html',
  styleUrls: ['./garden-designer-sidebar.component.scss'],
})
export class GardenDesignerSidebarComponent {
  faAnglesRight = faAnglesRight;

  @Input()
  isVisible = true;

  @Output()
  toggleEventEmitter: EventEmitter<void> = new EventEmitter<void>();

  onToggle(): void {
    this.toggleEventEmitter.emit();
  }
}
