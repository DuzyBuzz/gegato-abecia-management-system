import { Component } from '@angular/core';

@Component({
  selector: 'app-funeral-contract-entry',
  imports: [],
  templateUrl: './funeral-contract-entry.html',
  styleUrl: './funeral-contract-entry.scss',
})
export class FuneralContractEntry {
  showContractModal = false;

  openModal() {
    this.showContractModal = true;
  }

  closeModal() {
    this.showContractModal = false;
  }
}
