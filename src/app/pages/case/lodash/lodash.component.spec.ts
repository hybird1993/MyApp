import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LodashComponent } from './lodash.component';

describe('LodashComponent', () => {
  let component: LodashComponent;
  let fixture: ComponentFixture<LodashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LodashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
