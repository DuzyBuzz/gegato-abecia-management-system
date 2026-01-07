import { Routes } from '@angular/router';
import { MainLayout } from './pages/layout/main-layout/main-layout';
import { ClientRecord } from './pages/client-record/client-record';
import { FuneralContractEntry } from './entry-forms/funeral-contract-entry/funeral-contract-entry';
import { BillingEntry } from './entry-forms/billing-entry/billing-entry';
import { Login } from './pages/login/login';
import { FuneralServiceContractPrinting } from './printing-forms/funeral-service-contract-printing/funeral-service-contract-printing';
import { CremationCertificate } from './printing-forms/cremation-certificate/cremation-certificate';
import { AuthorityToCremateRemainsPrinting } from './printing-forms/authority-to-cremate-remains-printing/authority-to-cremate-remains-printing';
import { StatementOfAccount } from './printing-forms/statement-of-account/statement-of-account';
import { Inventory } from './pages/inventory/inventory';
import { ItemsEntry } from './entry-forms/items-entry/items-entry';

export const routes: Routes = [

  /* ===============================
   * ROOT → LOGIN (LOAD FIRST)
   * =============================== */
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  /* ===============================
   * PUBLIC ROUTES
   * =============================== */
  {
    path: 'login',
    component: Login
  },

  /* ===============================
   * AUTHENTICATED AREA (With layout)
   * =============================== */
  {
    path: 'user',
    component: MainLayout,
    children: [

      {
        path: 'client-record',
        component: ClientRecord
      },
      {
        path: 'inventory',
        component: Inventory
      },

      /* ENTRY FORMS */
      {
        path: 'entry-forms',
        children: [
          {
            path: 'funeral-service-contract',
            component: FuneralContractEntry
          },
          {
            path: 'billing-entry',
            component: BillingEntry
          },
                    {
            path: 'items-entry',
            component: ItemsEntry
          }
        ]
      }

    ]
  },

  /* ===============================
   * PRINTING FORMS
   * =============================== */
  {
    path: 'printing-forms',
    children: [
      {
        path: 'funeral-service-contract',
        component: FuneralServiceContractPrinting
      },
      {
        path: 'cremation-certificate',
        component: CremationCertificate
      },
      {
        path: 'authority-to-cremate-remains',
        component: AuthorityToCremateRemainsPrinting
      },
      {
        path: 'statement-of-account',
        component: StatementOfAccount
      }
    ]
  },

  /* ===============================
   * FALLBACK
   * =============================== */
  {
    path: '**',
    redirectTo: 'login'
  }
];
