import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaConcesiones } from './lista-concesiones';

describe('ListaConcesiones', () => {
  let component: ListaConcesiones;
  let fixture: ComponentFixture<ListaConcesiones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaConcesiones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaConcesiones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
