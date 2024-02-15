import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaPersonaComponent } from './empresa-persona.component';

describe('EmpresaPersonaComponent', () => {
  let component: EmpresaPersonaComponent;
  let fixture: ComponentFixture<EmpresaPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaPersonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
