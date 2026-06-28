import { Link } from "react-router-dom";
import type { Product } from "../models/product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  // const { addToCart, cartItems } = useCart() as CartContextType;

  // const productInCart = cartItems.find((item) => item.id === product.id);

  // const productQuantityLabel = productInCart
  // ? `(${productInCart.quantity})`
  // : "";

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-card-image"
      />

      <div className="p-6">
        <h3 className="product-card-name">{product.name}</h3>

        <p className="product-card-price">R{product.price}</p>

        <div className="flex gap-2">
          <Link className="btn btn-secondary" to={`/product/${product.id}`}>
            View Details
          </Link>

          <button
            className="btn btn-primary"
            // onClick={() => addToCart(product.id)}
          >
            Add to Card
            {/* {productQuantityLabel} */}
          </button>
        </div>
      </div>
    </div>
  );
}
