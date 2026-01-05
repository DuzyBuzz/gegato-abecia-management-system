import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  template: `
    <img [src]="src" [alt]="alt" [style.width.px]="size" [style.height.px]="size" class="block object-cover rounded-lg" />
  `,
  standalone: true,
  imports: [CommonModule]
})
export class LogoComponent {
  @Input() src = 'assets/images/gigato-logo.jpg';
  @Input() alt = 'Gigato';
  @Input() size = 96;
}
