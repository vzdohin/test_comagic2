import React from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { List, Button, Card, Avatar } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useCartStore } from "../../utils/useCartStore";
import { userStore } from "../../stores/UserStore";

const Cart = observer(() => {
  const cartStore = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!userStore.isLoggedIn) {
      navigate("/login", { state: { from: "checkout" } });
    } else {
      navigate("/checkout-page");
    }
  };
  return (
    <Card title="Корзина" bordered={false} className="cart">
      <List
        itemLayout="horizontal"
        dataSource={cartStore.items}
        locale={{ emptyText: "Корзина пуста" }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <DeleteOutlined
                key="delete"
                onClick={() => cartStore.removeFromCart(item.key)}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.imageUrl} size={64} />}
              title={item.title}
              description={`Цена: ${item.price} руб. Количество: ${item.count}`} // оставлю количество для реализации покупки нескольких товаров
            />
            <div>{item.price * item.count} руб.</div>
          </List.Item>
        )}
      />
      <div className="cart__total-container">
        <span>Итого:</span>
        <b>{cartStore.total} руб.</b>
      </div>
      <Button
        type="primary"
        block
        disabled={cartStore.items.length === 0}
        className="cart__total-amount"
        onClick={handleCheckout}
      >
        Оформить заказ
      </Button>
    </Card>
  );
});

export default Cart;
