import { makeAutoObservable } from "mobx";

class OrdersStore {
  orders = [];

  constructor() {
    makeAutoObservable(this);
  }

  addOrder(order) {
    const orderId = Math.random().toString(36).substr(2, 9);
    this.orders.push({ ...order, id: orderId, date: new Date().toISOString() });
    return orderId;
  }

  getOrdersByEmail(email) {
    return this.orders.filter((order) => order.email === email);
  }
}

export const ordersStore = new OrdersStore();
