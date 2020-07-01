import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwCalculateComponent } from './sw-calculate.component';

describe('SwCalculateComponent', () => {
  let component: SwCalculateComponent;
  let fixture: ComponentFixture<SwCalculateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwCalculateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwCalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
