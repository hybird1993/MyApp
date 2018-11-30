import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisjsComponent } from './visjs.component';

describe('VisjsComponent', () => {
  let component: VisjsComponent;
  let fixture: ComponentFixture<VisjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
