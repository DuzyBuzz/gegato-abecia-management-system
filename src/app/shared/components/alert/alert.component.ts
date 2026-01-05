import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type AlertType = 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'app-alert',
  template: `
    <div [ngClass]="getAlertClasses()">
      <span class="font-bold text-lg" *ngIf="showIcon">{{ getIcon() }}</span>
      <span>{{ message }}</span>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class AlertComponent {
  @Input() type: AlertType = 'info';
  @Input() message: string = '';
  @Input() showIcon = true;

  getIcon(): string {
    const icons: Record<AlertType, string> = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    return icons[this.type];
  }

  getAlertClasses(): string {
    const baseClasses = 'flex items-center gap-2 px-4 py-3 rounded-lg border-l-4 text-sm';
    const typeClasses: Record<AlertType, string> = {
      success: 'bg-green-50 text-green-800 border-l-green-500',
      error: 'bg-red-50 text-red-800 border-l-red-500',
      warning: 'bg-yellow-50 text-yellow-800 border-l-yellow-500',
      info: 'bg-blue-50 text-blue-800 border-l-blue-500'
    };
    return `${baseClasses} ${typeClasses[this.type]}`;
  }
}
