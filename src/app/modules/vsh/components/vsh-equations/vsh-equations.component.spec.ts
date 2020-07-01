import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VshEquationsComponent } from './vsh-equations.component';

describe('VshEquationsComponent', () => {
  let component: VshEquationsComponent;
  let fixture: ComponentFixture<VshEquationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VshEquationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VshEquationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
