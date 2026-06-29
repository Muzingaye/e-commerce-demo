import React, { useEffect, useState } from "react";
import type { Product } from "../models/product";
import ProductCard from "../Components/ProductCard";
import { ApiProduct } from "../api/product";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const api = new ApiProduct();

        const response = await api.fetchProducts();

        if (!response) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await response;
        setProducts(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page">
      <div className="container">
        <h2 className="page-title">Products</h2>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
