import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCiudadano } from './form-ciudadano';

describe('FormCiudadano', () => {
  let component: FormCiudadano;
  let fixture: ComponentFixture<FormCiudadano>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCiudadano]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCiudadano);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
