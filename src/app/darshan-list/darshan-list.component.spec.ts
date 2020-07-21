/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DarshanListComponent } from './darshan-list.component';

describe('DarshanListComponent', () => {
  let component: DarshanListComponent;
  let fixture: ComponentFixture<DarshanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarshanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarshanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
