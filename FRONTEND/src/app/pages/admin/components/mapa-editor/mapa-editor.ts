import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as fabric from 'fabric';
import { Zona } from '../../../../interfaces/zona';
declare let bootstrap: any;

@Component({
  selector: 'app-mapa-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mapa-editor.html',
  styleUrl: './mapa-editor.scss',
})
export class MapaEditor implements AfterViewInit {
  @ViewChild('htmlCanvas') htmlCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('zonaModal') zonaModalElement!: ElementRef;

  private canvas!: fabric.Canvas;
  private modalInstancia: any;
  
  public isDrawing = false;
  @Input() cementerioId!: number;
  @Input() zonasExistentes: Zona[] = [];

  private rectanguloActual: fabric.Rect | null = null;
  private inicioX = 0;
  private inicioY = 0;

  public nuevaZona: any = { 
    nombre: '', 
    tipo_zona: 'NICHO', 
    filas: 1, 
    columnas: 1 
  };

  ngAfterViewInit() {
    this.iniciarCanvas();
    this.modalInstancia = new bootstrap.Modal(this.zonaModalElement.nativeElement, {
      backdrop: 'static',
      keyboard: false
    });
  }

  iniciarCanvas() {
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, {
      width: 1000,
      height: 700,
      selection: true
    });

    this.configurarEventosMouse();
    this.cargarFondo('mapas/1.jpg');

    if (this.zonasExistentes.length > 0) {
      this.cargarZonasGuardadas();
    }
  }

  configurarEventosMouse() {
    this.canvas.on('mouse:down', (evt) => {
      if (!this.isDrawing || evt.target) return;
      
      const puntero = this.canvas.getScenePoint(evt.e);
      this.inicioX = puntero.x;
      this.inicioY = puntero.y;

      this.rectanguloActual = new fabric.Rect({
        left: this.inicioX,
        top: this.inicioY,
        width: 0,
        height: 0,
        fill: 'rgba(40, 167, 69, 0.3)',
        stroke: '#28a745',
        strokeWidth: 2,
        selectable: false,
        evented: false,
        strokeUniform: true,
        originX: 'left',
        originY: 'top'
      });

      this.canvas.add(this.rectanguloActual);
    });

    this.canvas.on('mouse:move', (evt) => {
      if (!this.isDrawing || !this.rectanguloActual) return;
      
      const puntero = this.canvas.getScenePoint(evt.e);

      const x = Math.min(puntero.x, this.inicioX);
      const y = Math.min(puntero.y, this.inicioY);
      const w = Math.abs(this.inicioX - puntero.x);
      const h = Math.abs(this.inicioY - puntero.y);

      this.rectanguloActual.set({
        left: x,
        top: y,
        width: w,
        height: h
      });

      this.canvas.requestRenderAll();
    });

    this.canvas.on('mouse:up', () => {
      if (!this.isDrawing || !this.rectanguloActual) return;

      if (this.rectanguloActual.width! < 5 || this.rectanguloActual.height! < 5) {
        this.canvas.remove(this.rectanguloActual);
        this.rectanguloActual = null;
      } else {
        this.rectanguloActual.setCoords();
        this.abrirModalZona();
      }
    });
  }

  abrirModalZona() {
    this.nuevaZona = { nombre: '', tipo_zona: 'NICHO', filas: 1, columnas: 1 };
    this.modalInstancia.show();
  }

  confirmarZona() {
    if (this.rectanguloActual) {
      const filasFinales = this.nuevaZona.tipo_zona === 'CRIPTA' ? 1 : this.nuevaZona.filas;

      (this.rectanguloActual as any).set('data', {
        nombre: this.nuevaZona.nombre,
        tipo_zona: this.nuevaZona.tipo_zona,
        filas: filasFinales,
        columnas: this.nuevaZona.columnas,
        cementerio_id: this.cementerioId
      });

      this.rectanguloActual.set({ selectable: true, evented: true });
      this.canvas.setActiveObject(this.rectanguloActual);
    }
    this.modalInstancia.hide();
    this.desactivarModoDibujo();
    this.rectanguloActual = null;
    this.canvas.requestRenderAll();
  }

  cancelarZona() {
    if (this.rectanguloActual) this.canvas.remove(this.rectanguloActual);
    this.modalInstancia.hide();
    this.desactivarModoDibujo();
    this.rectanguloActual = null;
    this.canvas.requestRenderAll();
  }

  activarModoDibujo() {
    this.isDrawing = true;
    this.canvas.discardActiveObject();
    this.canvas.selection = false;
    this.canvas.defaultCursor = 'crosshair';
  }

  desactivarModoDibujo() {
    this.isDrawing = false;
    this.canvas.selection = true;
    this.canvas.defaultCursor = 'default';
  }

  cargarFondo(url: string) {
    fabric.Image.fromURL(url).then((img) => {
      img.set({
        originX: 'left', originY: 'top',
        scaleX: this.canvas.width! / img.width!,
        scaleY: this.canvas.height! / img.height!
      });
      this.canvas.backgroundImage = img;
      this.canvas.requestRenderAll();
    });
  }

  cargarZonasGuardadas() {
    this.zonasExistentes.forEach(zona => {
      if (!zona.posicionCanvas) return;
      fabric.util.enlivenObjects([JSON.parse(zona.posicionCanvas)]).then((objetos) => {
        objetos.forEach((obj) => {
          const v = obj as any;
          v.set('data', { 
            nombre: zona.nombre, 
            tipo_zona: zona.tipoZona, 
            filas: zona.filas, 
            columnas: zona.columnas, 
            id_bd: zona.id 
          });
          v.set({ fill: 'rgba(40, 167, 69, 0.3)', stroke: '#28a745', strokeWidth: 2, selectable: true });
          this.canvas.add(v);
        });
        this.canvas.requestRenderAll();
      });
    });
  }

  guardarMapa() {
    const listaGuardar = this.canvas.getObjects()
      .filter(obj => (obj as any).data)
      .map(obj => {
        const d = (obj as any).data;
        return {
          id: d.id_bd || null,
          nombre: d.nombre,
          tipo_zona: d.tipo_zona,
          filas: d.filas,
          columnas: d.columnas,
          cementerio_id: this.cementerioId,
          coordenadas_poligono: JSON.stringify(obj.toObject(['left', 'top', 'width', 'height', 'scaleX', 'scaleY', 'angle']))
        };
      });
  }

  borrarSeleccionado() {
    const activeObjects = this.canvas.getActiveObjects();
    if (activeObjects.length > 0 && confirm('¿Borrar las zonas seleccionadas?')) {
      activeObjects.forEach(obj => this.canvas.remove(obj));
      this.canvas.discardActiveObject();
      this.canvas.requestRenderAll();
    }
  }
}