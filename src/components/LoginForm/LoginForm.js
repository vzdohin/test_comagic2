import React, { useState } from "react";
import "./LoginForm.css";
import { Form, Input, Button, Typography, Modal } from "antd";
import { userStore } from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const { Text } = Typography;

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onFinish = (values) => {
    try {
      userStore.login(values.email, values.password);
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} className="login-form">
      <h2 className="login-form__title">Вход</h2>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Введите ваш Email!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Введите ваш пароль!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
      <Text>
        Ещё не зарегистрированы? <Link to="/registration">Регистрация</Link>
      </Text>
      <Modal
        title="Ошибка входа"
        open={!!error}
        onCancel={() => setError("")}
        footer={[
          <Button key="back" onClick={() => setError("")}>
            ОК
          </Button>,
        ]}
      >
        <p>{error}</p>
      </Modal>
    </Form>
  );
};
export default LoginForm;
