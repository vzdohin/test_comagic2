import { makeAutoObservable } from "mobx";

class UserStore {
  user = null;
  history = [];
  registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

  constructor() {
    makeAutoObservable(this);
    this.loadUserFromLocalStorage();
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  clearUser() {
    this.user = null;
    localStorage.removeItem("currentUser");
  }

  addToHistory(order) {
    this.history.push(order);
  }

  register(user) {
    const existingUser = this.registeredUsers.find(
      (u) => u.email === user.email
    );
    if (existingUser) {
      throw new Error("Пользователь с таким email уже существует");
    } else {
      this.registeredUsers.push(user);
      localStorage.setItem(
        "registeredUsers",
        JSON.stringify(this.registeredUsers)
      );
    }
  }
  loadUserFromLocalStorage() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      this.user = user;
    }
  }
  login(email, password) {
    const user = this.registeredUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      this.setUser(user);
    } else {
      throw new Error("Неверный email или пароль");
    }
  }
  logout() {
    this.clearUser();
  }
  get isLoggedIn() {
    return !!this.user;
  }
}

export const userStore = new UserStore();
