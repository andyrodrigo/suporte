import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';

import { config } from '../config/config';
import { IPessoa } from '../models/pessoa.model';
import { IEmailRequest } from '../models/emailRequest.model';

@Injectable({
  providedIn: 'root',
})
export class ValidacaoService {
  private readonly API_URL = `${config['apiUrl']}`;

  pessoa: IPessoa = {
    url: '',
    sistema: {
      modulo: 'RH',
      codigo: 'COD',
    },
    orgao: {
      nome: 'Orgao',
      cnpj: 'cnpj',
    },
    usuario: {
      nome: 'Alírio',
      cpf: 'CPF',
      telefone: 'TELEFONE',
      email: '',
    },
  };

  private pessoaBehavior = new BehaviorSubject<IPessoa>(this.pessoa);

  constructor(private httpClient: HttpClient) {}

  public consultarPessoa(): any {
    return this.pessoaBehavior;
  }

  public escreverPessoa(pessoa: IPessoa): void {
    this.pessoaBehavior.next(pessoa);
  }

  public enviarCodigoEmail(request: IEmailRequest): Observable<any> {
    // return of(
    //   `Codigo: ${request.codigo}/ Email: ${request.email}/ Nome: ${request.nome}`
    // );
    let url = `${this.API_URL}/api/email/enviar`;
    return this.httpClient.post(url, request, {
      observe: 'response',
    });
  }

  public enviarPessoa(pessoa: IPessoa): Observable<any> {
    let url = `${this.API_URL}/api/Usuario/Validar`;
    return this.httpClient.post<any>(url, pessoa, {
      observe: 'response',
    });

    // pessoa = {
    //   ...pessoa,
    //   url: 'https://andyrodrigo.github.io/Sign-Up_Page/inside/casamento.html',
    // };
    //return of(pessoa);
  }
}
