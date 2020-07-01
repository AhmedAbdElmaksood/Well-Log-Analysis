import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPorosityComponent } from './total-porosity.component';

describe('TotalPorosityComponent', () => {
  let component: TotalPorosityComponent;
  let fixture: ComponentFixture<TotalPorosityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalPorosityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPorosityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
