import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import {AgendamentosComponent} from './views/agendamentos/agendamentos.component';
import {BaseComponent} from './components/base/base.component';

export const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: 'agendamentos', component: AgendamentosComponent },
      //{ path: 'clientes', component: ClientesComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];
