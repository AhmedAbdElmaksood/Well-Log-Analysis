import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectivePorosityLogComponent } from './effective-porosity-log.component';

describe('EffectivePorosityLogComponent', () => {
  let component: EffectivePorosityLogComponent;
  let fixture: ComponentFixture<EffectivePorosityLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffectivePorosityLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectivePorosityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
