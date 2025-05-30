import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = `${environment.urlBase}usuarios`;
  }

  public login(usuario: string, clave: string): Observable<any> {
    const loginPayload = {
      correo: usuario,
      clave: clave
    };
    const urlT = `${environment.urlBase}auth/login`; // Ajusta si tu backend usa otro path
  
    return this.http.post(urlT, loginPayload);
  }
  

}
