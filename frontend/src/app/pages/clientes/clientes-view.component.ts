import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes-view',
  templateUrl: './clientes-view.component.html'
})
export class ClientesViewComponent implements OnInit {
  cliente: Cliente | null = null;
  error = '';

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getCliente(id).subscribe({
      next: c => this.cliente = c,
      error: _ => this.error = 'Cliente não encontrado'
    });
  }
}
