import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ElementRef } from '@angular/core';



interface Comentario {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
  
})

export class DatatableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  data: any = [];
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private httpClient: HttpClient) { }
  ngOnInit() {
    this.dtOptions = {
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'
      }
    }
    this.httpClient.get('https://jsonplaceholder.typicode.com/comments')
      .subscribe((data) => {
        this.data = data;
        this.dtTrigger.next(data);
      });
  }
  ngOndestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  Editar(id: number): void {
    this.httpClient.get(`https://jsonplaceholder.typicode.com/comments/${id}`)
      .subscribe((data: any) => { // especificar el tipo de data como any
        console.log('Datos del comentario con ID:', id, data);
        const idValorInput = document.getElementById('idvaloreditar') as HTMLInputElement;
        const NameValorInput = document.getElementById('NombreValorEditar') as HTMLInputElement;
        const correoValorInput = document.getElementById('CorreoEditar') as HTMLInputElement;
        idValorInput.value = String(data.id);
        NameValorInput.value = String(data.name);
        correoValorInput.value = String(data.email);
      });
  }

  Actualizar(): void {
    const idValorInput = document.getElementById('idvaloreditar') as HTMLInputElement;
    const NameValorInput = document.getElementById('NombreValorEditar') as HTMLInputElement;
    const correoValorInput = document.getElementById('CorreoEditar') as HTMLInputElement;

    const datosActualizados = {
      name: NameValorInput.value,
      email: correoValorInput.value
    };

    this.httpClient.put(`https://jsonplaceholder.typicode.com/comments/${idValorInput.value}`, datosActualizados)
      .subscribe((data: any) => {
        alert('Datos actualizados');
      });
  }
  crearProducto(): void {
    
    const nameValorInput = document.getElementById('NombreValorCrear') as HTMLInputElement;
    const correoValorInput = document.getElementById('CorreoValorCrear') as HTMLInputElement;
  
    // Validar que los campos no estén vacíos
    if (nameValorInput.value.trim() === '' || correoValorInput.value.trim() === '') {
      alert('Por favor ingrese un nombre y un correo electrónico.');
      return;
    }
  
    // Validar que el correo electrónico tenga un formato válido
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(correoValorInput.value)) {
      alert('Por favor ingrese un correo electrónico válido.');
      return;
    }
  
    const datosNuevoUsuario = {
      name: nameValorInput.value,
      email: correoValorInput.value
    };
  
    this.httpClient.post('https://jsonplaceholder.typicode.com/comments', datosNuevoUsuario)
      .subscribe((data: any) => {
        alert('Nuevo Producto creado');
      });
  }
  

  PasarValores(id: number): void {
    this.httpClient.get(`https://jsonplaceholder.typicode.com/comments/${id}`)
      .subscribe((data: any) => { // especificar el tipo de data como any
        console.log('Datos del comentario con ID:', id, data);
        const idValorInput = document.getElementById('idvalorEliminar') as HTMLInputElement;
        idValorInput.value = String(data.id);
      });
  }

  EliminarProducto(): void {
    const idValorInputEliminar = document.getElementById('idvalorEliminar') as HTMLInputElement;
    this.httpClient.delete(`https://jsonplaceholder.typicode.com/comments/${idValorInputEliminar}`)
      .subscribe((data: any) => {
        console.log('Datos del comentario con ID:', idValorInputEliminar);
        alert('Producto eliminado');
        
      });
  }
  


}
