import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenDesignerModalComponent } from './garden-designer-modal.component';

describe('GardenDesignerModalComponent', () => {
  let component: GardenDesignerModalComponent;
  let fixture: ComponentFixture<GardenDesignerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardenDesignerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardenDesignerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
