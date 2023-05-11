import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenDesignerToolbarComponent } from './garden-designer-toolbar.component';

describe('GardenDesignerToolbarComponent', () => {
  let component: GardenDesignerToolbarComponent;
  let fixture: ComponentFixture<GardenDesignerToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardenDesignerToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardenDesignerToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
