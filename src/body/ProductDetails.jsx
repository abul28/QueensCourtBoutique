import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Product Details for ID: {id}</h1>
      {/* Fetch product details based on the ID if needed */}
    </div>
  );
};

export default ProductDetails;
