import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  quadraNome: string;
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
}
