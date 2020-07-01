import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VshParametersComponent } from './vsh-parameters.component';

describe('VshParametersComponent', () => {
  let component: VshParametersComponent;
  let fixture: ComponentFixture<VshParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VshParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VshParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
