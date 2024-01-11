import { Component, Input } from '@angular/core';
import { ToolType } from '../../enums/tool-type.enum';

@Component({
  selector: 'app-garden-designer-footer',
  templateUrl: './garden-designer-footer.component.html',
  styleUrls: ['./garden-designer-footer.component.scss'],
})
export class GardenDesignerFooterComponent {
  @Input()
  activeTool = ToolType.NONE;

  toolType = ToolType;
}
