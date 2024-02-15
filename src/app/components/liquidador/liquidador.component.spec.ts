import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidadorComponent } from './liquidador.component';

describe('LiquidadorComponent', () => {
  let component: LiquidadorComponent;
  let fixture: ComponentFixture<LiquidadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiquidadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
