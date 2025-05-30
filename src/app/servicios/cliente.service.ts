import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globales } from '../modelos/globales';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Cliente } from '../modelos/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: string;

  constructor(
    private http: HttpClient
  ) { 
    this.url = `${environment.urlBase}clientes`;
  }

  public obtenerHeader() {
    const headers = new HttpHeaders({
      'Authorization': Globales.usuario!.usuario,//.token
    });
    return { headers: headers };
  }

  public listar(): Observable<any> {
    let urlT = `${this.url}/listar`;
    return this.http.get<any[]>(urlT, this.obtenerHeader());
  }

  // Ejemplo de método en ClienteService
  actualizarMoroso(id: number, moroso: boolean) {
    return this.http.patch(`${this.url}/${id}/moroso`, { moroso });
}
  
  public buscar(nombre: string): Observable<any> {
    let urlT = `${this.url}/buscar/${nombre}`;
    return this.http.get<any[]>(urlT, this.obtenerHeader());
  }

  public agregar(cliente: Cliente): Observable<any> {
    let urlT = this.url + "/agregar";
    return this.http.post<any>(urlT, cliente, this.obtenerHeader());
  }

  public actualizar(cliente: Cliente): Observable<any> {
    let urlT = this.url + "/modificar";
    return this.http.put<any>(urlT, cliente, this.obtenerHeader());
  }

  public eliminar(id: number): Observable<any> {
    let urlT = `${this.url}/eliminar/${id}`;
    return this.http.delete<any>(urlT, this.obtenerHeader());
  }

  public descargarReporteClientes() {
    this.http.get('http://localhost:8080/clientes/reporte', { responseType: 'blob' })
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'clientes_reporte.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }
}
