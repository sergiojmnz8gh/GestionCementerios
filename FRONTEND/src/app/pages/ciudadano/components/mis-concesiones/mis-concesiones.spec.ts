import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisConcesiones } from './mis-concesiones';

describe('MisConcesiones', () => {
  let component: MisConcesiones;
  let fixture: ComponentFixture<MisConcesiones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisConcesiones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisConcesiones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
