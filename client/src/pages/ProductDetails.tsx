import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../models/product";

const ProductDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProductsById(id: number) {
      try {
        const respdonse = await fetch(`http://127.0.0.1:8000/products/${id}/`);

        const response = await fetch(`http://127.0.0.1:8000/products/${id}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product = await response.json();
        if (!data) {
          navigate("/");
        }
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchProductsById(Number(id));
  }, [id]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;
  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src="{product.image} " alt="{product.name}" />
          </div>
          <div className="product-detail-content">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">{product.price}</p>
            <p className="product-detail-description">{product.description}</p>

            <button className="btn btn-primary">Add to Card</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
