import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiAg, Agendamento, Horario } from '../../services/apiAg.service';
import {BaseComponent} from '../../components/base/base.component';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css'],
  standalone: true,
  imports: [CommonModule, BaseComponent]
})
export class AgendamentosComponent implements OnInit {
  weekDates: { day: string, date: string }[] = [];
  timeSlots: string[] = [
    '09:00 10:00', '10:00 11:00', '11:00 12:00', '12:00 13:00',
    '13:00 14:00', '14:00 15:00', '15:00 16:00', '16:00 17:00',
    '17:00 18:00', '18:00 19:00', '19:00 20:00', '20:00 21:00',
    '21:00 22:00'
  ];
  agendamentos: Agendamento[] = [];

  constructor(private agendamentoService: ApiAg) {}

  ngOnInit() {
    this.generateWeekDates();
    this.loadAgendamentos();
  }

  generateWeekDates() {
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
      const day = date.toLocaleDateString('pt-BR', options).split(', ')[0].replace('-feira', '');
      const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

      this.weekDates.push({
        day: day.charAt(0).toUpperCase() + day.slice(1),
        date: dateStr
      });
    }
  }

  loadAgendamentos() {
    this.agendamentoService.getAgendamentos().subscribe(data => {
      const validAgendamentos: Agendamento[] = [];

      data.forEach(agendamento => {
        const existingAgendamentos = validAgendamentos.filter(a =>
          a.dataAgendamento === agendamento.dataAgendamento &&
          a.horarios.some(h => h.inicio === agendamento.horarios[0].inicio)
        );

        const isQuadraDuplicada = existingAgendamentos.some(a => a.quadraNome === agendamento.quadraNome);

        if (!isQuadraDuplicada && existingAgendamentos.length < 4) {
          validAgendamentos.push(agendamento);
        }
      });

      this.agendamentos = validAgendamentos;
    });
  }

  isHorarioMarcado(date: string, time: string): string[] {
    const quadrasMarcadas: string[] = [];

    this.agendamentos.forEach(agendamento => {
      if (agendamento.dataAgendamento === date) {
        const horario = agendamento.horarios.find(h => h.inicio === time.split(' ')[0]);
        if (horario) {
          quadrasMarcadas.push(agendamento.quadraNome);
        }
      }
    });

    return quadrasMarcadas;
  }
  getQuadraClass(quadra: string): string {
    switch (quadra) {
      case 'Quadra 1':
        return 'quadra-azul';
      case 'Quadra 2':
        return 'quadra-vermelho';
      case 'Quadra 3':
        return 'quadra-verde';
      case 'Quadra 4':
        return 'quadra-amarelo';
      default:
        return '';
    }
  }

}
