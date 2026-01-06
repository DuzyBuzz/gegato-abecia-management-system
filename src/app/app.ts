import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthorityToCremateRemainsPrinting } from "./printing-forms/authority-to-cremate-remains-printing/authority-to-cremate-remains-printing";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthorityToCremateRemainsPrinting],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('gegato-abecia-management-system');
}
