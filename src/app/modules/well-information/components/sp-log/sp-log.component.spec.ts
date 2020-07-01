import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpLogComponent } from './sp-log.component';

describe('SpLogComponent', () => {
  let component: SpLogComponent;
  let fixture: ComponentFixture<SpLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
