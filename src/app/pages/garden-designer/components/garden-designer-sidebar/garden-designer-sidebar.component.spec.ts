import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenDesignerSidebarComponent } from './garden-designer-sidebar.component';

describe('GardenDesignerSidebarComponent', () => {
  let component: GardenDesignerSidebarComponent;
  let fixture: ComponentFixture<GardenDesignerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardenDesignerSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardenDesignerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
