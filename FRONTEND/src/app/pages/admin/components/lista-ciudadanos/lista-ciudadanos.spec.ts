import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCiudadanos } from './lista-ciudadanos';

describe('ListaCiudadanos', () => {
  let component: ListaCiudadanos;
  let fixture: ComponentFixture<ListaCiudadanos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCiudadanos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCiudadanos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
