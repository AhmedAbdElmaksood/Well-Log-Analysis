import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VshParametersFormComponent } from './vsh-parameters-form.component';

describe('VshParametersFormComponent', () => {
  let component: VshParametersFormComponent;
  let fixture: ComponentFixture<VshParametersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VshParametersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VshParametersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
