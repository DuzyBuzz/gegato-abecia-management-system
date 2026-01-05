import { Routes } from '@angular/router';
import { MainLayout } from './pages/main-layout/main-layout';
import { ClientRecord } from './pages/client-record/client-record';
import { FuneralContractEntry } from './entry-forms/funeral-contract-entry/funeral-contract-entry';
import { Login } from './pages/auth/login/login';
import { FuneralServiceContractPrinting } from './printing-forms/funeral-service-contract-printing/funeral-service-contract-printing';

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
          }
        ]
      }

    ]
  },
    /* ===============================
   * PRINTING FORMS AREA (With layout)
   * =============================== */
  {
    path: 'forms',
    children: [

      /* Default page */
      {
        path: 'funeral-service-contract',
        component: FuneralServiceContractPrinting
      },



      /* ENTRY FORMS */
      {
        path: 'entry-forms',
        children: [
          {
            path: 'funeral-service-contract',
            component: FuneralContractEntry
          }
        ]
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
