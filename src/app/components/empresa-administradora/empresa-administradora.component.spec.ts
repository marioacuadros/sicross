import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaAdministradoraComponent } from './empresa-administradora.component';

describe('EmpresaAdministradoraComponent', () => {
  let component: EmpresaAdministradoraComponent;
  let fixture: ComponentFixture<EmpresaAdministradoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaAdministradoraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaAdministradoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
