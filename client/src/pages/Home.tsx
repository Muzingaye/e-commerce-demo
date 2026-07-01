import type { Product } from "../models/product";
import ProductCard from "../Components/ProductCard";
import { ApiProduct } from "../api/product";
import { useQuery } from "@tanstack/react-query";

async function fetchProducts() {
  const api = new ApiProduct();
  const data = await api.fetchProducts();
  return data.results;
}

const Home: React.FC = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error instanceof Error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className="page">
      <div className="container">
        <h2 className="page-title">Products</h2>

        <div className="product-grid">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
