import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type InventoryItem = {
  id: string;
  name: string;
  category: 'Casket' | 'Urn' | 'Consumable' | 'Service' | 'Vehicle';
  description?: string;
  quantity: number;
  unit: 'pcs' | 'set' | 'service';
  price: number;
  status: 'Available' | 'Low Stock' | 'Out of Stock';
};

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.html'
})
export class Inventory {

  inventory: InventoryItem[] = [
    {
      id: 'CST-001',
      name: 'Wooden Deluxe Casket',
      category: 'Casket',
      quantity: 4,
      unit: 'pcs',
      price: 38000,
      status: 'Available'
    },
    {
      id: 'URN-004',
      name: 'Marble Premium Urn',
      category: 'Urn',
      quantity: 1,
      unit: 'pcs',
      price: 12000,
      status: 'Low Stock'
    },
    {
      id: 'CON-001',
      name: 'Embalming Chemical Set',
      category: 'Consumable',
      quantity: 0,
      unit: 'set',
      price: 4500,
      status: 'Out of Stock'
    },

  ];

  getStatusColor(status: string) {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return '';
    }
  }

  deduct(item: InventoryItem) {
    if (item.quantity > 0) {
      item.quantity--;
      this.updateStatus(item);
    }
  }

  restock(item: InventoryItem) {
    item.quantity++;
    this.updateStatus(item);
  }

  private updateStatus(item: InventoryItem) {
    if (item.quantity === 0) {
      item.status = 'Out of Stock';
    } else if (item.quantity <= 2) {
      item.status = 'Low Stock';
    } else {
      item.status = 'Available';
    }
  }

  formatCurrency(v: number) {
    return '₱' + v.toLocaleString();
  }
}
