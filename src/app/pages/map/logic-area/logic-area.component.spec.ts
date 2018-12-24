import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicAreaComponent } from './logic-area.component';

describe('LogicAreaComponent', () => {
  let component: LogicAreaComponent;
  let fixture: ComponentFixture<LogicAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
