import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaEditor } from './mapa-editor';

describe('MapaEditor', () => {
  let component: MapaEditor;
  let fixture: ComponentFixture<MapaEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
