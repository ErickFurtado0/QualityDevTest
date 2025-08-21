import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes-delete',
  templateUrl: './clientes-delete.component.html'
})
export class ClientesDeleteComponent implements OnInit {
  cliente: Cliente | null = null;
  id!: number;
  error = '';
  deleting = false;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getCliente(this.id).subscribe({
      next: c => this.cliente = c,
      error: _ => this.error = 'Cliente não encontrado'
    });
  }

  confirmar() {
    this.deleting = true;
    this.api.deleteCliente(this.id).subscribe({
      next: _ => { this.deleting = false; this.router.navigate(['/']); },
      error: err => { this.deleting = false; this.error = err?.error?.error || 'Erro ao excluir'; }
    });
  }
}
