import React, { useState } from "react";
import { Card } from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import "./ProductCard.css";
import { observer } from "mobx-react";
import { useCartStore } from "../../utils/useCartStore";

const ProductCard = observer(({ product, category }) => {
  const cartStore = useCartStore();

  const productKey = `${category}-${product.id}`;

  const [isAdded, setIsAdded] = useState(
    cartStore.items.some((item) => item.key === productKey)
  );

  const addToCart = () => {
    cartStore.addToCart(product, category);
    setIsAdded(true);
  };
  const removeFromCart = () => {
    cartStore.removeFromCart(productKey);
    setIsAdded(false);
  };

  return (
    <Card
      hoverable
      className="product-card"
      cover={<img alt={product.title} src={product.imageUrl} />}
      actions={[
        // <HeartOutlined key="like" />, избранное сделаю в будущем
        isAdded ? (
          <CheckOutlined
            key="added"
            onClick={removeFromCart}
            style={{ color: "green" }}
          />
        ) : (
          <PlusOutlined key="add" onClick={addToCart} />
        ),
      ]}
    >
      <Card.Meta
        title={<div className="product-card__title">{product.title}</div>}
        description={
          <div className="product-card__footer">
            <div className="product-card__price-title">Цена</div>
            <div className="product-card__price-value">
              {product.price} руб.
            </div>
          </div>
        }
      />
    </Card>
  );
});

export default ProductCard;
