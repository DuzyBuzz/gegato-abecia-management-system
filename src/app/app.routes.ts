import { Routes } from '@angular/router';
import { MainLayout } from './pages/main-layout/main-layout';
import { ClientRecord } from './pages/client-record/client-record';
import { FuneralContractEntry } from './entry-forms/funeral-contract-entry/funeral-contract-entry';
import { Login } from './pages/auth/login/login';
import { FuneralServiceContractPrinting } from './printing-forms/funeral-service-contract-printing/funeral-service-contract-printing';
import { BillingEntry } from './entry-forms/billing-entry/billing-entry';
import { CremationCertificate } from './printing-forms/cremation-certificate/cremation-certificate';
import { AuthorityToCremateRemainsPrinting } from './printing-forms/authority-to-cremate-remains-printing/authority-to-cremate-remains-printing';
import { StatementOfAccount } from './printing-forms/statement-of-account/statement-of-account';

export const routes: Routes = [

  /* ===============================
   * PUBLIC ROUTES (No layout)
   * =============================== */
  {
    path: 'login',
    component: Login
  },

  /* ===============================
   * AUTHENTICATED AREA (With layout)
   * =============================== */
  {
    path: '',
    component: MainLayout,
    children: [

      /* Default page */
      {
        path: '',
        redirectTo: 'client-record',
        pathMatch: 'full'
      },

      {
        path: 'client-record',
        component: ClientRecord
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
          }
        ]
      }

    ]
  },
    /* ===============================
   * PRINTING FORMS AREA (With layout)
   * =============================== */
  {
    path: 'printing-forms',
    children: [

      /* Default page */
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
    redirectTo: 'client-record'
  }
  
];
