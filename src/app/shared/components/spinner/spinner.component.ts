import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  template: `
    <svg viewBox="0 0 50 50" class="w-full h-full animate-spin" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="25" cy="25" r="20" fill="none" stroke-width="5" stroke="currentColor" stroke-linecap="round"/>
    </svg>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class SpinnerComponent {}
