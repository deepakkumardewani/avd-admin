import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DarshanComponent } from './darshan.component';

describe('DarshanComponent', () => {
  let component: DarshanComponent;
  let fixture: ComponentFixture<DarshanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarshanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarshanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
