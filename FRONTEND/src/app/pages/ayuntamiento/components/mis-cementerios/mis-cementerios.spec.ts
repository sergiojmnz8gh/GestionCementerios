import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCementerios } from './mis-cementerios';

describe('MisCementerios', () => {
  let component: MisCementerios;
  let fixture: ComponentFixture<MisCementerios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisCementerios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisCementerios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
