import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  template: `
    <div [style.padding.px]="padding" class="bg-white rounded-lg shadow-md">
      <ng-content></ng-content>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class CardComponent {
  @Input() padding = 24;
}
