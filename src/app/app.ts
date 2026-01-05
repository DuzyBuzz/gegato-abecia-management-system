import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FuneralServiceContractPrinting } from "./printing-forms/funeral-service-contract-printing/funeral-service-contract-printing";

@Component({
  selector: 'app-root',
  imports: [ FuneralServiceContractPrinting],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('gegato-abecia-management-system');
}
