import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroGraphComponent } from './macro-graph.component';

describe('MacroGraphComponent', () => {
  let component: MacroGraphComponent;
  let fixture: ComponentFixture<MacroGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MacroGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
