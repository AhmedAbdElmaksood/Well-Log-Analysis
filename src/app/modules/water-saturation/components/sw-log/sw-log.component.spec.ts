import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwLogComponent } from './sw-log.component';

describe('SwLogComponent', () => {
  let component: SwLogComponent;
  let fixture: ComponentFixture<SwLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
