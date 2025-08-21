import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ApiService } from '../../services/api.service';
import {ViaCepAddress, ViaCepService} from '../../services/viacep.service';

@Component({
  selector: 'app-cliente-modal',
  templateUrl: './cliente-modal.component.html'
})
export class ClienteModalComponent implements OnInit {
  @Input() cliente: Cliente | null = null;
  @Output() closed = new EventEmitter<boolean>();

  form: any = {
    Codigo: '', Nome: '', CPF_CNPJ: '', CEP: '', Logradouro: '', Endereco: '', Numero: '',
    Bairro: '', Cidade: '', UF: '', Complemento: '', Fone: '', LimiteCredito: 0, Validade: ''
  };
  error = '';
  saving = false;

  constructor(private api: ApiService, private viaCep: ViaCepService) {}

  ngOnInit(): void {
    if (this.cliente) {
      this.form = { ...this.cliente };
    }
  }

  buscarCEP() {
    const obs = this.viaCep.buscar(this.form.CEP?.toString() || '');
    if (!obs) return;
    obs.subscribe((data: ViaCepAddress | null) => {
      if (data) {
        this.form.Logradouro = data.logradouro;
        this.form.Bairro = data.bairro;
        this.form.Cidade = data.localidade;
        this.form.UF = data.uf;
        this.form.Complemento = data.complemento;
        if (!this.form.Endereco) this.form.Endereco = data.logradouro;
      }
    });
  }

  salvar() {
    this.saving = true; this.error = '';
    const payload = { ...this.form };
    payload.CEP = this.form.CEP ? parseInt(String(this.form.CEP).replace(/\D/g,''), 10) : null;
    payload.LimiteCredito = this.form.LimiteCredito ? parseFloat(this.form.LimiteCredito) : 0;

    const req = this.cliente
      ? this.api.updateCliente(this.cliente.ID, payload)
      : this.api.createCliente(payload);

    req.subscribe({
      next: _ => { this.saving = false; this.closed.emit(true); },
      error: err => { this.saving = false; this.error = err?.error?.error || 'Erro ao salvar'; }
    });
  }
}
