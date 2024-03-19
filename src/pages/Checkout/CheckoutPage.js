import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { useCartStore } from "../../utils/useCartStore";
import { ordersStore } from "../../stores/OrdersStore";
import { userStore } from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const cartStore = useCartStore();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [totalOrderAmount, setTotalOrderAmount] = useState(0);

  const handleSubmit = (values) => {
    const order = {
      ...values,
      items: cartStore.items,
      total: cartStore.total,
      email: userStore.user.email,
    };

    const generatedOrderId = ordersStore.addOrder(order);
    setOrderId(generatedOrderId);
    setTotalOrderAmount(cartStore.total);
    cartStore.clearCart();
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    if (!userStore.isLoggedIn) {
      navigate("/login", { state: { from: "checkout" } });
    } else {
      navigate("/profile");
    }
  };
  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit} style={{ width: "40%" }}>
        <Form.Item name="name" label="Имя" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Адрес" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Телефон"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите ваш номер телефона!",
            },
            {
              pattern: new RegExp(/^\+[1-9]\d{1,14}$/),
              message:
                "Пожалуйста, введите корректный номер формате +79123456789",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Оформить заказ
          </Button>
        </Form.Item>
      </Form>
      <div style={{ marginTop: "20px" }}>
        <b>Итого к оплате: {cartStore.total} руб.</b>
      </div>
      <Modal
        title="Подтверждение заказа"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText="OK"
      >
        <p>Номер вашего заказа: {orderId}</p>
        <p>Сумма к оплате: {totalOrderAmount} руб.</p>
        <p>Наши операторы свяжутся с вами для уточнения деталей заказа.</p>
      </Modal>
    </>
  );
};

export default CheckoutPage;
