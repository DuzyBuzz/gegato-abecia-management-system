import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FuneralServiceContractPrinting } from "./printing-forms/funeral-service-contract-printing/funeral-service-contract-printing";
import { AuthorityToCremateRemainsPrinting } from "./printing-forms/authority-to-cremate-remains-printing/authority-to-cremate-remains-printing";
import { CremationCertificate } from "./printing-forms/cremation-certificate/cremation-certificate";
import { StatementOfAccount } from "./printing-forms/statement-of-account/statement-of-account";
import { MainLayout } from "./pages/main-layout/main-layout";
import { Login } from "./pages/auth/login/login";

@Component({
  selector: 'app-root',
  imports: [FuneralServiceContractPrinting, AuthorityToCremateRemainsPrinting, CremationCertificate, StatementOfAccount, RouterOutlet, MainLayout, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('gegato-abecia-management-system');
}
