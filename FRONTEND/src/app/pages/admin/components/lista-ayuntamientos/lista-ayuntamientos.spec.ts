import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAyuntamientos } from './lista-ayuntamientos';

describe('ListaAyuntamientos', () => {
  let component: ListaAyuntamientos;
  let fixture: ComponentFixture<ListaAyuntamientos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAyuntamientos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAyuntamientos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
