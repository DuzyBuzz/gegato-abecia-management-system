import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

@Component({
  selector: 'app-heading',
  template: `
    <h1 *ngIf="level === 'h1'" [style.color]="color" class="text-4xl font-bold"><ng-content></ng-content></h1>
    <h2 *ngIf="level === 'h2'" [style.color]="color" class="text-3xl font-bold"><ng-content></ng-content></h2>
    <h3 *ngIf="level === 'h3'" [style.color]="color" class="text-2xl font-bold"><ng-content></ng-content></h3>
    <h4 *ngIf="level === 'h4'" [style.color]="color" class="text-xl font-bold"><ng-content></ng-content></h4>
    <h5 *ngIf="level === 'h5'" [style.color]="color" class="text-lg font-bold"><ng-content></ng-content></h5>
    <h6 *ngIf="level === 'h6'" [style.color]="color" class="text-base font-bold"><ng-content></ng-content></h6>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class HeadingComponent {
  @Input() level: HeadingLevel = 'h1';
  @Input() color = '#1f2937';
}
