import type { Product } from "../models/product";
import { API_URL } from "../config";

export class ApiProduct {
  constructor(private product?: Product) {
    this.product = product;
  }

  async fetchProducts(): Promise<Product> {
    try {
      const response = await fetch(`${API_URL}/products/`);
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async fetchProductById(id: number): Promise<Product> {
    const response = await fetch(`${API_URL}/product/${id}/`);
    console.log(response.json(), "Muzi");

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return await response.json();
  }
}
