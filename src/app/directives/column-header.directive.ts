import { Directive, HostListener, Output, EventEmitter, Input, ElementRef } from '@angular/core';

export interface ColumnFilterEvent {
  column: string;
  position: { top: number; left: number };
}

@Directive({
  selector: '[appColumnHeader]',
  standalone: true
})
export class ColumnHeaderDirective {
  @Input() appColumnHeader: string = '';
  @Output() columnFilter = new EventEmitter<ColumnFilterEvent>();

  constructor(private el: ElementRef) {}

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    this.columnFilter.emit({
      column: this.appColumnHeader,
      position: {
        top: rect.bottom + 5,
        left: rect.left
      }
    });
  }
}
