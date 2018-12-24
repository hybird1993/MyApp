import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityPanelComponent } from './facility-panel.component';

describe('FacilityPanelComponent', () => {
  let component: FacilityPanelComponent;
  let fixture: ComponentFixture<FacilityPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
