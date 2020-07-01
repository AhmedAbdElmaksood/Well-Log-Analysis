import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPorosityLogComponent } from './total-porosity-log.component';

describe('TotalPorosityLogComponent', () => {
  let component: TotalPorosityLogComponent;
  let fixture: ComponentFixture<TotalPorosityLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalPorosityLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPorosityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
