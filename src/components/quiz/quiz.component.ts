
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class QuizComponent {
  scenarioCode = `
// order-details.component.ts
@Component({...})
export class OrderDetailsComponent {
  private orderService = inject(OrderService);
  private inventoryService = inject(InventoryService);
  private shippingService = inject(ShippingService);
  private notificationService = inject(NotificationService);

  orderDetails = signal(null);

  loadOrder(orderId: string) {
    // 1. Fetch order
    const order = this.orderService.getOrder(orderId);
    // 2. Check inventory for each item
    const itemsWithStock = order.items.map(item => ({
      ...item,
      inStock: this.inventoryService.checkStock(item.sku)
    }));
    // 3. Get shipping estimates
    const shippingOptions = this.shippingService.getEstimates(order.address);
    // 4. Update signal
    this.orderDetails.set({ 
      ...order, 
      items: itemsWithStock, 
      shippingOptions 
    });
    // 5. Send notification
    this.notificationService.notify('Order details loaded');
  }
}
`;

  answered = signal<boolean>(false);
  correct = signal<boolean | null>(null);
  
  correctReason = `Correct! This component coordinates multiple services (Order, Inventory, Shipping, Notification) to perform a single high-level operation. An OrderProcessingFacade would encapsulate this complexity, making the component much cleaner and easier to test.`;
  
  incorrectReason = `Not quite. While this approach works, it leads to high coupling and complexity within the component. The component becomes responsible for the entire orchestration logic, which is a classic sign that a Facade could simplify the architecture.`;

  selectAnswer(isFacade: boolean) {
    if (this.answered()) return;

    this.answered.set(true);
    if (isFacade) {
      this.correct.set(true);
    } else {
      this.correct.set(false);
    }
  }

  reset() {
    this.answered.set(false);
    this.correct.set(null);
  }
}
