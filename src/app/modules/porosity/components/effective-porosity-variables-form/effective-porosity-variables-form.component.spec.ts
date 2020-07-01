import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectivePorosityVariablesFormComponent } from './effective-porosity-variables-form.component';

describe('EffectivePorosityVariablesFormComponent', () => {
  let component: EffectivePorosityVariablesFormComponent;
  let fixture: ComponentFixture<EffectivePorosityVariablesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffectivePorosityVariablesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectivePorosityVariablesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
