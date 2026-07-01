import type { Product } from "../models/product";
import { API_URL } from "../config";

export class ApiProduct {
  // constructor(private product?: Product) {}

  async fetchProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products/`);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  async fetchProductById(id: number): Promise<Product> {
    const response = await fetch(`${API_URL}/products/${id}/`);

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
}
