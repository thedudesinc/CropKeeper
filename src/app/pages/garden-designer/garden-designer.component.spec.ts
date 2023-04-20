import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenDesignerComponent } from './garden-designer.component';

describe('GardenDesignerComponent', () => {
  let component: GardenDesignerComponent;
  let fixture: ComponentFixture<GardenDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardenDesignerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardenDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
