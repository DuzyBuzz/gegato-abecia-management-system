import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  template: `
    <div *ngIf="message" class="bg-red-50 text-red-800 px-3 py-2 rounded-lg text-sm border-l-4 border-l-red-500">
      {{ message }}
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class ErrorMessageComponent {
  @Input() message: string | null = null;
}
