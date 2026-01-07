import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthorityToCremateRemainsPrinting } from "./printing-forms/authority-to-cremate-remains-printing/authority-to-cremate-remains-printing";
import { Users } from "./pages/users/users";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthorityToCremateRemainsPrinting, Users],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('gegato-abecia-management-system');
}
