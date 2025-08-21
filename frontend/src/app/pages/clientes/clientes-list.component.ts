import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html'
})
export class ClientesListComponent implements OnInit {
  filtros: any = { codigo: '', nome: '', cidade: '', cep: '' };
  clientes: Cliente[] = [];
  loading = false;

  modalOpen = false;
  editing: Cliente | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    this.loading = true;
    this.api.listClientes(this.filtros).subscribe({
      next: data => { this.clientes = data; this.loading = false; },
      error: _ => { this.loading = false; }
    });
  }

  novo() {
    this.editing = null;
    this.modalOpen = true;
  }
  editar(c: Cliente) {
    this.editing = c;
    this.modalOpen = true;
  }
  deletar(c: Cliente) {
    if (confirm('Confirma excluir o cliente ' + c.Nome + '?')) {
      this.api.deleteCliente(c.ID).subscribe(_ => this.buscar());
    }
  }
  onClosed(changed: boolean) {
    this.modalOpen = false;
    this.editing = null;
    if (changed) this.buscar();
  }
}
