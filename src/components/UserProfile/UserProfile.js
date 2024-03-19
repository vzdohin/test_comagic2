import React from "react";
import { observer } from "mobx-react";
import { userStore } from "../../stores/UserStore";
import { ordersStore } from "../../stores/OrdersStore";
import { List, Typography } from "antd";

const { Text } = Typography;

const UserProfile = observer(() => {
  const userOrders = ordersStore.getOrdersByEmail(userStore.user.email);

  return (
    <div>
      {/* <Descriptions title="Профиль пользователя">
        <Descriptions.Item label="Name">{user?.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
      </Descriptions>
      <Button onClick={handleLogout}>Выйти из аккаунта</Button>{" "} */}
      <h2>Мои заказы</h2>
      <List
        itemLayout="horizontal"
        dataSource={userOrders}
        locale={{ emptyText: "У вас пока нет заказов :(" }}
        renderItem={(order) => (
          <List.Item>
            <List.Item.Meta
              title={`Заказ №${order.id}`}
              description={
                <>
                  <Text strong>Дата заказа:</Text>{" "}
                  {new Date(order.date).toLocaleString()}
                  <br />
                  <Text strong>Сумма заказа:</Text> {order.total} руб.
                  <br />
                  <Text strong>Товары:</Text>
                  <List
                    dataSource={order.items}
                    renderItem={(item) => (
                      <List.Item>
                        <Text>
                          {item.title} - {item.count} шт. по {item.price}{" "}
                          руб./шт.
                        </Text>
                      </List.Item>
                    )}
                  />
                </>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
});

export default UserProfile;
