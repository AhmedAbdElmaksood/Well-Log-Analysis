import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtLogComponent } from './dt-log.component';

describe('DtLogComponent', () => {
  let component: DtLogComponent;
  let fixture: ComponentFixture<DtLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
