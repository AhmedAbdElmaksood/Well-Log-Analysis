import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogControlComponent } from './log-control.component';

describe('LogControlComponent', () => {
  let component: LogControlComponent;
  let fixture: ComponentFixture<LogControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
