import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DensityNeutronLogComponent } from './density-neutron-log.component';

describe('DensityNeutronLogComponent', () => {
  let component: DensityNeutronLogComponent;
  let fixture: ComponentFixture<DensityNeutronLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DensityNeutronLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DensityNeutronLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
