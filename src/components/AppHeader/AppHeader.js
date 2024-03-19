import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import {
  ShoppingCartOutlined,
  // HeartOutlined,
  UserOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./AppHeader.css";
import { useCartStore } from "../../utils/useCartStore";
import { userStore } from "../../stores/UserStore";
import { observer } from "mobx-react";

const { Header } = Layout;

const AppHeader = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();

  const cartStore = useCartStore();

  const handleLogout = () => {
    userStore.logout();
    navigate("/login");
  };

  // интересное наблюдение: я не могу поменять имя переменной на другое (userDropdownMenu), иначе падает все приложение.
  // наверное дело в особенности антдизайна
  const items = [
    {
      key: "/profile",
      icon: <OrderedListOutlined />,
      label: <Link to="/profile">Мои заказы</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <span onClick={handleLogout}>Выйти из аккаунта</span>,
    },
  ];

  const menuItems = [
    {
      key: "/cart",
      icon: <ShoppingCartOutlined />,
      label: <Link to="/cart">Корзина ({cartStore.total} руб)</Link>,
    },

    // оставлю для будущего развития проекта
    // {
    //   key: "/favorites",
    //   icon: <HeartOutlined />,
    //   label: <Link to="/favorites">Избранное</Link>,
    // },
    userStore.isLoggedIn
      ? {
          key: "/profile",
          label: (
            <Dropdown menu={{ items }} trigger={["click"]}>
              <button
                onClick={(e) => e.preventDefault()}
                className="header__dropdown-link"
              >
                <Avatar className="avatar" icon={<UserOutlined />} />
                {userStore.user.name} <DownOutlined />
              </button>
            </Dropdown>
          ),
        }
      : {
          key: "/login",
          label: <Link to="/login">Войти / Регистрация</Link>,
        },
  ].filter(Boolean);

  return (
    <Header className="header">
      <Link to="/" className="header__logo-link">
        <img src="/logo.png" alt="logo" className="header__logo" />
        <div>
          <h2 className="header__title">Shoes Store</h2>
          <p className="header__subtitle">Магазин лучшей обуви</p>
        </div>
      </Link>

      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="header__menu"
      />
    </Header>
  );
});

export default AppHeader;
