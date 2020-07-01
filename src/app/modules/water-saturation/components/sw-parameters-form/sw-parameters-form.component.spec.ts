import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwParametersFormComponent } from './sw-parameters-form.component';

describe('SwParametersFormComponent', () => {
  let component: SwParametersFormComponent;
  let fixture: ComponentFixture<SwParametersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwParametersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwParametersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
