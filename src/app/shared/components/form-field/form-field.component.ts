import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  template: `
    <div class="flex flex-col gap-1.5 mb-4">
      <label *ngIf="label" class="block text-sm font-medium text-gray-700">
        {{ label }}
        <span *ngIf="required" class="text-red-600 ml-0.5">*</span>
      </label>
      <ng-content></ng-content>
      <p *ngIf="error" class="text-xs text-red-600">{{ error }}</p>
      <p *ngIf="hint && !error" class="text-xs text-gray-500">{{ hint }}</p>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class FormFieldComponent {
  @Input() label: string = '';
  @Input() required = false;
  @Input() error: string | null = null;
  @Input() hint: string = '';
}
