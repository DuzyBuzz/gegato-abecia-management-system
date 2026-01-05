import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paragraph',
  template: `<p [style.color]="color" [ngClass]="getSizeClass()">
    <ng-content></ng-content>
  </p>`,
  standalone: true,
  imports: [CommonModule]
})
export class ParagraphComponent {
  @Input() color = '#4b5563';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  getSizeClass(): string {
    const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base'
    };
    return sizeClasses[this.size];
  }
}
