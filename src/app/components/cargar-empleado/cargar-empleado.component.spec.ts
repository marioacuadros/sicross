import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarEmpleadoComponent } from './cargar-empleado.component';

describe('CargarEmpleadoComponent', () => {
  let component: CargarEmpleadoComponent;
  let fixture: ComponentFixture<CargarEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
