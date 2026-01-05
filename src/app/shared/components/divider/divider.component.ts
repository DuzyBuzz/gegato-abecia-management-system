import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-divider',
  template: `
    <div [ngClass]="getDividerClasses()" [style.margin]="margin + 'px'"></div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class DividerComponent {
  @Input() variant: 'horizontal' | 'vertical' = 'horizontal';
  @Input() margin = 16;

  getDividerClasses(): string {
    const baseClasses = 'bg-gray-300';
    const variantClasses = this.variant === 'horizontal' ? 'h-px w-full' : 'w-px h-full';
    return `${baseClasses} ${variantClasses}`;
  }
}
