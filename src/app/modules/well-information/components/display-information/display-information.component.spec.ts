import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInformationComponent } from './display-information.component';

describe('DisplayInformationComponent', () => {
  let component: DisplayInformationComponent;
  let fixture: ComponentFixture<DisplayInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
