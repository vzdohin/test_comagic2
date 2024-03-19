import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/Card/ProductCard";

const Sneakers = () => {
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://cf24c06c8bbe52a6.mokky.dev/sneakers");
      setSneakers(result.data);
    };

    fetchData();
  }, []);

  return (
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center",
      }}
    >
      {sneakers.map((sneaker) => (
        <ProductCard key={sneaker.id} product={sneaker} category="sneaker" />
      ))}
    </section>
  );
};

export default Sneakers;
