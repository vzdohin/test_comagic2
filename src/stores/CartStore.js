import { makeAutoObservable } from "mobx";

export class CartStore {
  items = [];

  constructor() {
    makeAutoObservable(this);
  }

  addToCart(product, category) {
    const productKey = `${category}-${product.id}`;
    const existingItem = this.items.find((item) => item.id === productKey);
    if (existingItem) {
      existingItem.count++;
    } else {
      this.items.push({ ...product, count: 1, key: productKey });
    }
    product.added = true;
  }

  removeFromCart(productKey) {
    this.items = this.items.filter((item) => item.key !== productKey);
  }

  clearCart() {
    this.items = [];
    // this.total = 0;
  }

  get total() {
    return this.items.reduce((sum, item) => sum + item.price * item.count, 0);
  }
}

export const cartStore = new CartStore();
