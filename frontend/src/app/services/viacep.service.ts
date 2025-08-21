import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface ViaCepAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

@Injectable({ providedIn: 'root' })
export class ViaCepService {
  constructor(private http: HttpClient) {}

  buscar(cep: string): Observable<ViaCepAddress | null> {
    const onlyDigits = (cep || '').replace(/\D/g, '');
    if (onlyDigits.length !== 8) return of(null);

    return this.http.get<any>(`https://viacep.com.br/ws/${onlyDigits}/json/`)
        .pipe(
            map(resp => {
              if (resp && !resp.erro) {
                return {
                  cep: resp.cep,
                  logradouro: resp.logradouro,
                  complemento: resp.complemento,
                  bairro: resp.bairro,
                  localidade: resp.localidade,
                  uf: resp.uf
                } as ViaCepAddress;
              }
              return null;
            })
        );
  }
}