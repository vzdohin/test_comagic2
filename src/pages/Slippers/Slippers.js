import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/Card/ProductCard";

const Slippers = () => {
  const [slippers, setSlippers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://cf24c06c8bbe52a6.mokky.dev/slippers");
      setSlippers(result.data);
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
      {slippers.map((slipper) => (
        <ProductCard key={slipper.id} product={slipper} category="slipper" />
      ))}
    </section>
  );
};

export default Slippers;
