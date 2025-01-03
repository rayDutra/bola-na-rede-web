import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.apiService.validateUser(this.user.email, this.user.password).subscribe({
        next: (users) => {
          if (users.length > 0 && users[0].password === this.user.password) {
            alert('Login realizado com sucesso!');
            console.log('Usuário logado:', users[0]);
            console.log('Redirecionando para Agendamentos...');
            this.router.navigate(['agendamentos']); // Redirecionamento
          } else {
            alert('E-mail ou senha incorretos.');
          }
        },
        error: (err) => {
          console.error('Erro ao validar usuário:', err);
          alert('Erro ao tentar realizar o login. Tente novamente.');
        }
      });
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }


  navegarAgendamentos(ev:any){
    this.router.navigate(['agendamentos']);
  }
}
