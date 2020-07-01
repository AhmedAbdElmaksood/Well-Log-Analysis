import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectivePorosityComponent } from './effective-porosity.component';

describe('EffectivePorosityComponent', () => {
  let component: EffectivePorosityComponent;
  let fixture: ComponentFixture<EffectivePorosityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffectivePorosityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectivePorosityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
