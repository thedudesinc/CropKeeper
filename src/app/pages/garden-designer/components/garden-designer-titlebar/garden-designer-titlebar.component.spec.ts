import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenDesignerTitlebarComponent } from './garden-designer-titlebar.component';

describe('GardenDesignerTitlebarComponent', () => {
  let component: GardenDesignerTitlebarComponent;
  let fixture: ComponentFixture<GardenDesignerTitlebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardenDesignerTitlebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardenDesignerTitlebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
