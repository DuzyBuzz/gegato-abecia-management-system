import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'app-badge',
  template: `
    <span [ngClass]="getBadgeClasses()">
      <ng-content></ng-content>
    </span>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'primary';
  @Input() rounded = true;

  getBadgeClasses(): string {
    const baseClasses = 'inline-block px-2.5 py-0.5 text-xs font-semibold';
    const roundedClasses = this.rounded ? 'rounded-full' : 'rounded';
    const variantClasses: Record<BadgeVariant, string> = {
      primary: 'bg-purple-100 text-purple-800',
      secondary: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      danger: 'bg-red-100 text-red-800',
      warning: 'bg-yellow-100 text-yellow-800',
      info: 'bg-blue-100 text-blue-800'
    };
    return `${baseClasses} ${roundedClasses} ${variantClasses[this.variant]}`;
  }
}
