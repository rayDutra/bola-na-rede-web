import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import {AgendamentosComponent} from './views/agendamentos/agendamentos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Rota inicial redirecionando para Login
  { path: 'login', component: LoginComponent },
  { path: 'agendamentos', component: AgendamentosComponent },
];
