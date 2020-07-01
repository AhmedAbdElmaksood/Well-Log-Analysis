import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrLogComponent } from './gr-log.component';

describe('GrLogComponent', () => {
  let component: GrLogComponent;
  let fixture: ComponentFixture<GrLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
