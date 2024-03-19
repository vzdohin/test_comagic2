import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/Card/ProductCard";

const Boots = () => {
  const [boots, setBoots] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://cf24c06c8bbe52a6.mokky.dev/boots");
      setBoots(result.data);
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
      {boots.map((boot) => (
        <ProductCard key={boot.id} product={boot} category="boots" />
      ))}
    </section>
  );
};

export default Boots;
