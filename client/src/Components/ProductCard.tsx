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
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[250px] object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl mb-2 text-gray-800">{product.name}</h3>

        <p className="text-2xl font-bold text-blue-600 mb-4">
          ${product.price}
        </p>

        <div className="flex gap-2">
          <Link
            className="px-6 py-3 border-0 rounded text-base font-medium cursor-pointer transition duration-200 ease-in-out hover:-translate-y-0.5 active:translate-y-0 no-underline inline-block text-center bg-gray-500 text-white hover:bg-gray-700"
            to={`/products/${product.id}`}
          >
            View Details
          </Link>

          <button
            className="px-6 py-3 border-0 rounded text-base font-medium cursor-pointer transition duration-200 ease-in-out hover:-translate-y-0.5 active:translate-y-0 no-underline inline-block text-center bg-blue-500 text-white hover:bg-blue-700"
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
