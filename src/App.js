import React from "react";
import "./App.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import AppHeader from "./components/AppHeader/AppHeader";
import Sneakers from "./pages/Sneakers/Sneakers";
import Slippers from "./pages/Slippers/Slippers";
import Boots from "./pages/Boots/Boots";
import Home from "./pages/Home/Home";
import Cart from "./components/Cart/Cart";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import UserProfile from "./components/UserProfile/UserProfile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const { Content, Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();

  const selectedKey =
    location.pathname === "/sneakers"
      ? "1"
      : location.pathname === "/slippers"
      ? "2"
      : location.pathname === "/boots"
      ? "3"
      : "";

  const menuItems = [
    {
      key: "1",
      label: <Link to="/sneakers">Кроссовки</Link>,
    },
    {
      key: "2",
      label: <Link to="/slippers">Сланцы</Link>,
    },
    {
      key: "3",
      label: <Link to="/boots">Ботинки</Link>,
    },
  ];

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{ height: "100%", borderRight: 0 }}
        items={menuItems}
      />
    </Sider>
  );
};

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Layout>
        <Sidebar width={200} className="site-layout-background" />

        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sneakers" element={<Sneakers />} />
              <Route path="/slippers" element={<Slippers />} />
              <Route path="/boots" element={<Boots />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout-page" element={<CheckoutPage />} />
              <Route path="/registration" element={<RegistrationForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <UserProfile />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
