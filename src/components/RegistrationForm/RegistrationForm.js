import React, { useState } from "react";
import "./RegistrationForm.css";
import { Form, Input, Button, Typography, Modal } from "antd";
import { userStore } from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const { Text } = Typography;

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onFinish = (values) => {
    if (values.password !== values.confirm) {
      setError("Пароли не совпадают");
      return;
    }
    try {
      userStore.register(values);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="reg-form"
      >
        <h2 className="reg-form__title">Регистрация</h2>
        <Form.Item
          name="name"
          label="Имя"
          rules={[
            { required: true, message: "Введите ваше имя" },
            { min: 2, message: "Имя должно содержать минимум 2 символа" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Введите ваш Email!" },
            { type: "email", message: "Введите корректный Email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Введите ваш пароль!" },
            { min: 6, message: "Пароль должен содержать минимум 6 символов" },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Подтвердите пароль"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Подтвердите ваш пароль!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
        <Text>
          Уже зарегистрированы? <Link to="/login">Войти</Link>
        </Text>
      </Form>
      <Modal
        title="Ошибка регистрации"
        open={!!error}
        onCancel={() => setError("")}
        footer={[
          <Button key="back" onClick={() => setError("")}>
            OK
          </Button>,
        ]}
      >
        <p>{error}</p>
      </Modal>
    </>
  );
};

export default RegistrationForm;
