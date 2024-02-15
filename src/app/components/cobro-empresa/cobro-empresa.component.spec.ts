import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobroEmpresaComponent } from './cobro-empresa.component';

describe('CobroEmpresaComponent', () => {
  let component: CobroEmpresaComponent;
  let fixture: ComponentFixture<CobroEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CobroEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobroEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
