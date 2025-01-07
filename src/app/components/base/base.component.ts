import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
  standalone: true,
  imports: [CommonModule, RouterOutlet]
})
export class BaseComponent {
  hoveredItem: string | null = null;
}
