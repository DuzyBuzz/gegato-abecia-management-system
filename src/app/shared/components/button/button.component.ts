import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-button',
  template: `
    <button
      [type]="type"
      [ngClass]="getButtonClasses()"
      [disabled]="disabled || loading"
      (click)="onClick($event)"
    >
      <ng-content></ng-content>
      <app-spinner *ngIf="loading" class="w-4 h-4"></app-spinner>
    </button>
  `,
  standalone: true,
  imports: [CommonModule, SpinnerComponent]
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Output() btnClick = new EventEmitter<Event>();

  getButtonClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all';
    const fullClasses = this.fullWidth ? 'w-full' : '';
    const variantClasses = this.variant === 'primary'
      ? 'bg-gradient-to-r from-purple-700 to-purple-900 text-white hover:shadow-lg'
      : 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    const disabledClasses = (this.disabled || this.loading) ? 'opacity-60 cursor-not-allowed' : '';
    return `${baseClasses} ${fullClasses} ${variantClasses} ${disabledClasses}`;
  }

  onClick(e: Event) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      return;
    }
    this.btnClick.emit(e);
  }
}
