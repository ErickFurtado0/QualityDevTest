import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface UF { id: number; sigla: string; nome: string; }
export interface Cidade { id: number; nome: string; }

@Injectable({ providedIn: 'root' })
export class IbgeService {
    constructor(private http: HttpClient) {}
    listarUFs(): Observable<UF[]> {
        return this.http.get<any[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .pipe(map(list => list.sort((a,b)=>a.nome.localeCompare(b.nome))));
    }
    listarCidades(siglaUF: string): Observable<Cidade[]> {
        return this.http.get<any[]>(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaUF}/municipios`
        ).pipe(map(list => list.map(x=>({id:x.id,nome:x.nome})).sort((a,b)=>a.nome.localeCompare(b.nome))));
    }
}
