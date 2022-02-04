import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyLineComponent } from './empty-line.component';

describe('EmptyLineComponent', () => {
  let component: EmptyLineComponent;
  let fixture: ComponentFixture<EmptyLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
