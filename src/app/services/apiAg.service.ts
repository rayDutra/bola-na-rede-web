import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

// Exportar os tipos
export interface Horario {
  inicio: string;
  fim: string;
  data: string;
  disponivel: boolean;
}

export interface Agendamento {
  id: string;
  userId: number;
  quadraId: string;
  quadraNome: string; // Supondo que você tenha esse campo
  dataAgendamento: string;
  status: boolean;
  horarios: Horario[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiAg {
  private apiUrl = 'http://localhost:3003/agendamentos';

  constructor(private http: HttpClient) {}

  getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.apiUrl);
  }

  isHorarioDisponivel(quadraId: string, data: string, horario: string): Observable<boolean> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}?quadraId=${quadraId}&dataAgendamento=${data}`).pipe(
      map(agendamentos => {
        const agendamento = agendamentos.find(a => a.quadraId === quadraId && a.dataAgendamento === data);
        return agendamento ? agendamento.horarios.some(h => h.inicio === horario && h.disponivel) : false;
      })
    );
  }
}
