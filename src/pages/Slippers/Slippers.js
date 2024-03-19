import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/Card/ProductCard";

const Snippers = () => {
  const [snippers, setSnippers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://cf24c06c8bbe52a6.mokky.dev/snippers");
      setSnippers(result.data);
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
      {snippers.map((snipper) => (
        <ProductCard key={snipper.id} product={snipper} category="snipper" />
      ))}
    </section>
  );
};

export default Snippers;
