import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenDesignerFooterComponent } from './garden-designer-footer.component';

describe('GardenDesignerFooterComponent', () => {
  let component: GardenDesignerFooterComponent;
  let fixture: ComponentFixture<GardenDesignerFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardenDesignerFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardenDesignerFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
