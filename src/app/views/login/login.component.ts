import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  loginErrorMessage: string = '';
  passwordVisible: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  resetErrorMessage(): void {
    this.loginErrorMessage = '';
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(form: NgForm): void {
    this.resetErrorMessage();

    if (form.invalid) {
      return;
    }

    this.apiService.validateUser(this.user.email, this.user.password).subscribe({
      next: (users) => {
        if (users.length > 0 && users[0].password === this.user.password) {
          console.log('Usuário logado:', users[0]);
          this.router.navigate(['agendamentos']);
        } else {
          this.loginErrorMessage = 'E-mail ou senha incorretos.';
        }
      },
      error: (err) => {
        console.error('Erro ao validar usuário:', err);
        this.loginErrorMessage = 'Erro ao processar a solicitação. Tente novamente mais tarde.';
      }
    });
  }
}
