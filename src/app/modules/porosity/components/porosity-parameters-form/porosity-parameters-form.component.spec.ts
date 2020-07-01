import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorosityParametersFormComponent } from './porosity-parameters-form.component';

describe('PorosityParametersFormComponent', () => {
  let component: PorosityParametersFormComponent;
  let fixture: ComponentFixture<PorosityParametersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorosityParametersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorosityParametersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
