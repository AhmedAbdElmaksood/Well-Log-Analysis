import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrCaliperLogComponent } from './gr-caliper-log.component';

describe('GrCaliperLogComponent', () => {
  let component: GrCaliperLogComponent;
  let fixture: ComponentFixture<GrCaliperLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrCaliperLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrCaliperLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
