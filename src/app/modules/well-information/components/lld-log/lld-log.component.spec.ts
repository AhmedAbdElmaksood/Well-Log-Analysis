import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LldLogComponent } from './lld-log.component';

describe('LldLogComponent', () => {
  let component: LldLogComponent;
  let fixture: ComponentFixture<LldLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LldLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LldLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
