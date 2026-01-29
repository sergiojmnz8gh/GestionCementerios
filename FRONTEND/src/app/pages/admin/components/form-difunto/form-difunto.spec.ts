import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDifunto } from './form-difunto';

describe('FormDifunto', () => {
  let component: FormDifunto;
  let fixture: ComponentFixture<FormDifunto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDifunto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDifunto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
