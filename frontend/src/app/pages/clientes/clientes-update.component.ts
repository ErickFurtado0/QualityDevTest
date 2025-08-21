import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ViaCepService, ViaCepAddress } from '../../services/viacep.service';
import { IbgeService } from '../../services/ibge.service';
import { Cliente } from '../../models/cliente.model';

interface UF { id: number; sigla: string; nome: string; }
interface Cidade { id: number; nome: string; }

@Component({
  selector: 'app-clientes-update',
  templateUrl: './clientes-update.component.html'
})
export class ClientesUpdateComponent implements OnInit {
  form: any = {};
  error = '';
  saving = false;
  id!: number;

  erroCpfCnpj = '';
  ufs: UF[] = [];
  cidades: Cidade[] = [];

  constructor(
      private route: ActivatedRoute,
      private api: ApiService,
      private viaCep: ViaCepService,
      private ibge: IbgeService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.ibge.listarUFs().subscribe(ufs => this.ufs = ufs);

    this.api.getCliente(this.id).subscribe({
      next: (c: Cliente) => {
        this.form = { ...c };
        if (this.form.UF) this.ibge.listarCidades(this.form.UF).subscribe(cs => this.cidades = cs);
      },
      error: _ => this.error = 'Cliente não encontrado'
    });
  }

  private onlyDigits(v: string) { return (v || '').replace(/\D/g, ''); }
  private normalizeDecimal(v: string) {
    const n = (v || '').replace(/[^\d.,]/g, '').replace(',', '.');
    const m = n.match(/^\d+(\.\d{0,2})?/); return m ? m[0] : '';
  }

  onDocInput(e: Event)      { const i = e.target as HTMLInputElement; i.value = this.onlyDigits(i.value); this.form.CPF_CNPJ = i.value; }
  onTelefoneInput(e: Event) { const i = e.target as HTMLInputElement; i.value = this.onlyDigits(i.value); this.form.Fone = i.value; }
  onCEPInput(e: Event)      { const i = e.target as HTMLInputElement; i.value = this.onlyDigits(i.value); this.form.CEP = i.value; }
  onNumeroInput(e: Event)   { const i = e.target as HTMLInputElement; i.value = this.onlyDigits(i.value); this.form.Numero = i.value; }
  onLimiteInput(e: Event)   { const i = e.target as HTMLInputElement; i.value = this.normalizeDecimal(i.value); this.form.LimiteCredito = i.value; }

  private isValidCPF(cpf: string): boolean {
    cpf = this.onlyDigits(cpf);
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let s = 0; for (let i=0;i<9;i++) s += +cpf[i]*(10-i);
    let d1 = (s*10)%11; if (d1 === 10) d1 = 0; if (d1 !== +cpf[9]) return false;
    s = 0; for (let i=0;i<10;i++) s += +cpf[i]*(11-i);
    let d2 = (s*10)%11; if (d2 === 10) d2 = 0; return d2 === +cpf[10];
  }
  private isValidCNPJ(cnpj: string): boolean {
    cnpj = this.onlyDigits(cnpj);
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
    const calc = (len: number) => {
      const pesos = len === 12 ? [5,4,3,2,9,8,7,6,5,4,3,2] : [6,5,4,3,2,9,8,7,6,5,4,3,2];
      const s = cnpj.slice(0, len).split('').reduce((a,d,i)=>a+(+d)*pesos[i],0);
      const r = s % 11; return r < 2 ? 0 : 11 - r;
    };
    const d1 = calc(12); if (d1 !== +cnpj[12]) return false;
    const d2 = calc(13); return d2 === +cnpj[13];
  }
  validarCpfCnpj() {
    const v = this.onlyDigits(this.form.CPF_CNPJ);
    this.erroCpfCnpj = '';
    if (!v) return;
    if (v.length <= 11) { if (!this.isValidCPF(v)) this.erroCpfCnpj = 'CPF inválido'; }
    else { if (!this.isValidCNPJ(v)) this.erroCpfCnpj = 'CNPJ inválido'; }
  }

  buscarCEP() {
    this.viaCep.buscar(String(this.form.CEP || '')).subscribe((data: ViaCepAddress | null) => {
      if (data) {
        this.form.Logradouro = data.logradouro;
        this.form.Bairro = data.bairro;
        this.form.Cidade = data.localidade;
        this.form.UF = data.uf;
        this.onUFChange();
      }
    });
  }
  onUFChange() {
    this.form.Cidade = '';
    this.cidades = [];
    if (this.form.UF) {
      this.ibge.listarCidades(this.form.UF).subscribe(c => this.cidades = c);
    }
  }

  salvar() {
    this.validarCpfCnpj();
    if (this.erroCpfCnpj) { this.error = this.erroCpfCnpj; return; }

    this.saving = true; this.error='';
    const payload = { ...this.form };
    payload.CEP = this.form.CEP ? parseInt(String(this.form.CEP), 10) : null;
    payload.LimiteCredito = this.form.LimiteCredito ? parseFloat(String(this.form.LimiteCredito)) : 0;

    this.api.updateCliente(this.id, payload).subscribe({
      next: _ => { this.saving = false; this.router.navigate(['/clientes']); },
      error: err => { this.saving = false; this.error = err?.error?.error || 'Erro ao atualizar'; }
    });
  }
}